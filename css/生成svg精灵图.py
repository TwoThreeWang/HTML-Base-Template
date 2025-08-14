import os
import re

# 输入 SVG 文件夹路径
INPUT_DIR = "icons"        # 存放多个 SVG 文件的目录
OUTPUT_FILE = "sprite.svg" # 输出精灵图文件

def clean_svg_content(svg_text):
    """
    清理 SVG 文件中的多余标签和属性，仅保留路径内容
    """
    # 去掉换行和多余空格
    svg_text = re.sub(r">\s+<", "><", svg_text.strip())
    # 删除 xml / doctype / 注释
    svg_text = re.sub(r"<\?xml.*?\?>", "", svg_text)
    svg_text = re.sub(r"<!DOCTYPE.*?>", "", svg_text)
    svg_text = re.sub(r"<!--.*?-->", "", svg_text)
    return svg_text

def extract_symbol(svg_text, symbol_id):
    """
    从单个 SVG 文件中提取 viewBox 和内容，生成 <symbol>
    """
    # 获取 viewBox
    viewbox_match = re.search(r'viewBox="([^"]+)"', svg_text)
    viewbox = viewbox_match.group(1) if viewbox_match else "0 0 24 24"

    # 提取 <svg> 内的内容
    inner_content = re.sub(r"<svg[^>]*>|</svg>", "", svg_text).strip()

    return f'<symbol id="{symbol_id}" viewBox="{viewbox}">{inner_content}</symbol>'

def generate_sprite(input_dir, output_file):
    symbols = []
    for filename in os.listdir(input_dir):
        if filename.endswith(".svg"):
            file_path = os.path.join(input_dir, filename)
            with open(file_path, "r", encoding="utf-8") as f:
                svg_raw = f.read()
                svg_clean = clean_svg_content(svg_raw)
                symbol_id = os.path.splitext(filename)[0]  # 用文件名做 ID
                symbols.append(extract_symbol(svg_clean, symbol_id))

    # 生成精灵图
    sprite_content = (
        '<svg xmlns="http://www.w3.org/2000/svg" style="display:none;">'
        + "".join(symbols) +
        "</svg>"
    )

    with open(output_file, "w", encoding="utf-8") as f:
        f.write(sprite_content)

    print(f"✅ 已生成精灵图: {output_file}")

if __name__ == "__main__":
    generate_sprite(INPUT_DIR, OUTPUT_FILE)
