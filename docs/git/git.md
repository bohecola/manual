# Git

## 账户配置

1. 配置全局账户，对所有 Git 仓库有效

```bash
git config --global user.name 'Your Name'
git config --global user.email 'Your Email'
```

1. 配置局部账户，只对当前 Git 仓库有效

```bash
git config --local user.name 'Your Name'
git config --local user.email 'Your Email'
```

1. 查看全局配置

```bash
git config --global --list
```

1. 查看局部配置

```bash
git config --local --list
```

## 本地基本操作

### 初始化本地库

```bash
git init
```

### 查看状态

```bash
git status
```

### 添加暂存区 git add

- 将当前目录及其子目录下所有变更添加到暂存区

```bash
git add .
```

- 将本地库所有变更添加到暂存区

```bash
git add -A
```

- 指定文件添加暂存区

```bash
git add file1 file2 ...
```

### 提交本地库 git commit

- 提交所有变更

```bash
git commit
# or
git commit -m '日志信息' -a
```

- 提交当前目录及其子目录的变更

```bash
git commit -m '日志信息' .
```

- 提交指定文件

```bash
git commit -m '日志信息' fileName
```

## 比较差异 git diff

1. 比较工作区和暂存区的所有差异，只能查看旧文件的变更（包括修改和删除），不能查看新文件（因为新文件还为被 git 追踪）

```bash
git diff
```

1. 比较指定文件工作区和暂存区的差异

```bash
git diff fileName
```

1. 比较暂存区和 HEAD 的所有差异

```bash
git diff --cached
```

1. 比较指定文件暂存区和 HEAD 的差异

```bash
git diff --cached fileName
```

1. 比较两个版本的差异

- 以前者为基准看后者的变化
- HEAD 表示最后一次 commit 对应的版本，HEAD~1 往前一个版本

```bash
git diff 版本号1 版本号2
git diff HEAD~1 HEAD
git diff HEAD~2 HEAD
```

1. 比较两个分支指定文件的差异

```bash
git diff 分支1 分支2 fileName
```

## 查看日志信息 git log

1. 查看简要日志信息

```bash
git reflog
```

1. 查看详细日志信息

```bash
git log
```

1. 查看极简日志信息

```bash
git log --oneline
```

1. 查看最近 n 次的版本信息

```bash
git log -n
```

1. 查看所有分支的版本历史

```bash
git log --all
```

1. 以图形形式展示版本历史

```bash
git log --graph
```

1. 查看涉及到指定文件的 commit 记录

```bash
git log fileName
```

1. 查看指定文件每一行修改对应的 commit 记录和作者

```bash
git blame fileName
```

## 分支命令

### 创建分支

- 基于当前分支创建分支

```bash
git branch 新分支
```

- 基于指定分支创建分支

```bash
git branch 新分支 已有分支
```

- 基于某个 commit 创建分支

```bash
git branch 新分支 commitID
```

- 基于当前分支创建分支并切换到新分支

```bash
git checkout -b 新分支
```

### 查看本地分支

```bash
git branch -v
```

### 删除分支

- 安全删除本地分支

```bash
git branch -d 分支
```

- 强制删除本地分支

```bash
git branch -D 分支
```

### 切换分支

```bash
git checkout 分支名
```

## 合并分支

`merge` 和 `rebase`的区别有待学习实践 😟

1. 将 A 分支合并到当前分支，且为 merge 创建 commit

```bash
git merge A
```

1. 将 A 分支合并到 B 分支，且为 merge 创建 commit

```bash
git merge A B
```

1. 把当前分⽀基于 B 分⽀做 rebase，以便把 B 分⽀合⼊到当前分⽀

```bash
git rebase B
```

1. 把 A 分⽀基于 B 分⽀做 rebase，以便把 B 分⽀合⼊到 A 分⽀

```bash
git rebase B A
```

## 版本穿梭与回滚

1. 工作区指定文件恢复成和暂存区一样

```bash
git checkout file1 file2 ...

# tips in the Git Bash
# use "git restore <file>..." to discard changes in working directory
git restore file1 file2 ...
```

1. 暂存区指定文件恢复成和 HEAD 一样

```bash
git reset file1 file2 ...

# tips in the Git Bash
# use "git restore --staged <file>..." to unstage
git restore --staged file1 file2 ...
```

1. 工作区和暂存区所有文件恢复成和 HEAD 一样

```bash
git reset --hard
```

1. 工作区和暂存区所有文件恢复成和指定版本一样

```bash
git reset --hard 版本号
```

## 修改 commit 记录

1. 往最后一次 commit 追加记录，而不新建 commit - [reference(opens new window)](https://segmentfault.com/a/1190000038535534)

```bash
git commit --amend
```

1. 合并 commit 记录 - [reference(opens new window)](https://www.jianshu.com/p/4a8f4af4e803)

```bash
git rebase -i HEAD~2
```

## 远程仓库交互

### git remote

1. 查看所有远程仓库地址别名

```bash
git remote -v
```

1. 为远程仓库起别名

```bash
git remote add 别名 地址
```

1. 删除远程仓库别名

```bash
git remote remove 别名
```

1. 修改别名

```bash
git remote rename 旧名 新名
```

### git clone

1. 克隆远程仓库到本地

```bash
git clone 地址
```

1. 克隆远程仓库指定分支到本地

```bash
git clone -b 远程仓库分支名 地址
```

### git pull

1. 拉取远程分支，并与本地分支合并

```bash
git pull 别名 分支名
```

### git push

1. 推送本地指定分支到仓库指定分支

```bash
git push 别名 本地分支:远程分支
```

1. 如果远程分支被省略，表示将本地分支推送到与之存在追踪关系的远程分支（通常两者同名），如果该远程分支不存在，则会被新建

```bash
git push origin master
```

1. 如果省略本地分支名，等同于推送一个空的本地分支到远程分支，表示删除指定的远程分支，等同于

```bash
git push origin :master
# 等同于
git push origin --delete master
```

1. 强制推送

```bash
git push --force origin master
```