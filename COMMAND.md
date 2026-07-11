# Git 更新命令

在 `D:\MyWebsite` 目录下执行：

## 日常更新

```powershell
Set-Location "D:\MyWebsite"
git status --short --branch
git add .
git commit -m "Update website files"
git push
```

## 超简版

```powershell
Set-Location "D:\MyWebsite"
git add .
git commit -m "Update website files"
git push
```

## 如果远程仓库又有新提交

```powershell
Set-Location "D:\MyWebsite"
git add .
git commit -m "Update website files"
git pull origin main --rebase
git push
```

## 第一次检查远程地址

```powershell
Set-Location "D:\MyWebsite"
git remote -v
```