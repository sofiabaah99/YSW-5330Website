import os
import glob

# 获取文件夹中的所有csv文件
csv_files = glob.glob('rawdata/*.csv')

# 遍历所有csv文件
for file in csv_files:
    # 获取文件的路径和扩展名
    path, ext = os.path.splitext(file)
    
    # 将文件名中的-改为_
    new_path = path.replace('-', '_')
    
    # 重命名文件
    os.rename(file, new_path + ext)