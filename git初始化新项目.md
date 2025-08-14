# 进入本地项目目录
cd /path/to/your/project

# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交到本地
git commit -m "Initial commit"

# 关联远程仓库
git remote add origin git@github.com:username/my-new-project.git

# 将当前所在的分支重命名为 main
git branch -M main

# 推送到远程仓库
git push -u origin main