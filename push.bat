set t="%date:~3,10% %time:~0,8%"
git add .
git commit -m %t%
git push -u origin master