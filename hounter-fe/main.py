import os
import shutil

# specify the directory you want to start from
rootDir = 'src'

for dirName, subdirList, fileList in os.walk(rootDir):
    for fname in fileList:
        if fname.endswith('.js'):
            full_file_name = os.path.join(dirName, fname)
            new_file_name = full_file_name[:-3] + '.jsx'
            shutil.move(full_file_name, new_file_name)