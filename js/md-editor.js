class MarkdownEditor {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        this.options = {
            storageKey: 'markdown_content',
            emojis: ['😊','😂','🤣','❤️','👍','🎉','🌟','✨','🔥','💡','⭐','💪','🎨','🎭','🎬','🎵','🎶','🎸','📚','💻','🖥️','📱','⌨️','🖱️','☕','🍵','🍺','🍷','🍕','🍔','🌈','☀️','🌙','⛅','🌤️','🌦️','🐱','🐶','🐼','🐨','🦊','🦁','🌸','🌺','🌷','🌹','🍀','🌿'],
            placeholder: '在这里输入Markdown文本...',
            minHeight: 300,
            ...options
        };
        this.init();
    }

    init() {
        this.createStructure();
        this.bindEvents();
        this.loadContent();
    }

    createStructure() {
        this.container.innerHTML = `
            <div class="md-editor-toolbar">
                <button data-action="togglePreview">预览</button>
                <button data-action="bold">加粗</button>
                <button data-action="link">链接</button>
                <button data-action="image">图片</button>
                <button data-action="code">代码</button>
                <button data-action="emoji">表情</button>
            </div>
            <div class="md-editor-emoji-panel"></div>
            <textarea class="md-editor-textarea" placeholder="${this.options.placeholder}"></textarea>
            <div class="md-editor-preview"></div>
        `;

        this.textarea = this.container.querySelector('.md-editor-textarea');
        this.preview = this.container.querySelector('.md-editor-preview');
        this.toolbar = this.container.querySelector('.md-editor-toolbar');
        this.emojiPanel = this.container.querySelector('.md-editor-emoji-panel');
        this.emojiButton = this.toolbar.querySelector('[data-action="emoji"]');

        this.emojiPanel.innerHTML = this.options.emojis.map(emoji =>
            `<div class="md-editor-emoji-item">${emoji}</div>`
        ).join('');

        this.textarea.style.minHeight = this.options.minHeight + 'px';
    }

    bindEvents() {
        let saveTimer;
        this.textarea.addEventListener('input', () => {
            clearTimeout(saveTimer);
            saveTimer = setTimeout(() => this.saveContent(), 300);
        });

        this.toolbar.addEventListener('click', e => {
            const button = e.target.closest('button');
            if (!button) return;
            const action = button.dataset.action;
            if (this[action]) this[action](button);
        });

        this.emojiPanel.addEventListener('click', e => {
            const item = e.target.closest('.md-editor-emoji-item');
            if (item) {
                this.insertText(item.textContent);
                this.togglePanel();
            }
        });

        document.addEventListener('click', e => {
            if (this.emojiPanel.classList.contains('show') &&
                !this.emojiButton.contains(e.target) &&
                !this.emojiPanel.contains(e.target)) {
                this.togglePanel();
            }
        });
    }

    loadContent() {
        this.textarea.value = localStorage.getItem(this.options.storageKey) || '';
    }

    saveContent() {
        localStorage.setItem(this.options.storageKey, this.textarea.value);
    }

    togglePreview(button) {
        this.isPreviewMode = !this.isPreviewMode;
        button.classList.toggle('active');

        if (this.isPreviewMode) {
            this.preview.style.display = 'block';
            this.textarea.style.display = 'none';
            this.preview.innerHTML = marked.parse(this.textarea.value);
        } else {
            this.preview.style.display = 'none';
            this.textarea.style.display = 'block';
        }
    }

    insertText(text, wrap) {
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const selected = this.textarea.value.substring(start, end);
        const content = wrap && selected ? wrap[0] + selected + wrap[1] : text;

        this.textarea.value = this.textarea.value.substring(0, start) + content + this.textarea.value.substring(end);
        this.textarea.focus();
        const newPos = start + content.length;
        this.textarea.selectionStart = this.textarea.selectionEnd = newPos;
        this.saveContent();
    }

    bold() { this.insertText('**加粗**', ['**', '**']); }
    code() { this.insertText('```\n代码\n```', ['```\n', '\n```']); }
    link() { this.insertText('[title](url)', ['[', '](url)']); }
    image() { this.insertText('![alt](imgurl)', ['![', '](imgurl)']); }
    emoji() { this.togglePanel() }

    togglePanel() {
        this.emojiPanel.classList.toggle('show');
    }
}

// 简化调用函数
function createMarkdownEditor(selector, options = {}) {
    return new MarkdownEditor(selector, options);
}

// 全局暴露
if (typeof window !== 'undefined') {
    window.MarkdownEditor = MarkdownEditor;
    window.createMarkdownEditor = createMarkdownEditor;
}