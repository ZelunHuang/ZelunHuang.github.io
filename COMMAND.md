# Git 更新命令

在 `D:\MyWebsite` 目录下执行：

## 使用 SSH 推送

如果你已经把 GitHub SSH key 配好了，先确认远程地址是 SSH：

```powershell
Set-Location "D:\MyWebsite"
git remote set-url origin git@github.com:ZelunHuang/ZelunHuang.github.io.git
git remote -v
```

然后直接推送：

```powershell
Set-Location "D:\MyWebsite"
git add .
git commit -m "Update website files"
git push origin main
```

## 日常更新

```powershell
Set-Location "D:\MyWebsite"
git status --short --branch
git add .
git commit -m "Update website files"
git push origin main
```

## 超简版

```powershell
Set-Location "D:\MyWebsite"
git add .
git commit -m "Update website files"
git push origin main
```

## 如果远程仓库又有新提交

```powershell
Set-Location "D:\MyWebsite"
git add .
git commit -m "Update website files"
git pull origin main --rebase
git push origin main
```

## 第一次检查远程地址

```powershell
Set-Location "D:\MyWebsite"
git remote -v
```