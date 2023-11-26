import subprocess

f = open("requirements.txt","r")
f2 = open("new.txt","w+")

# subprocess.Popen("pip list", stdout=f)

# f = open("requirements.txt","r")

lines = f.readlines()
extracted_lines = []

for i in lines:
    temp = i.split(" ")
    name , version = temp[0] ,temp[-1]
    name = name.strip()
    version = version.strip()
    name = name + "=="+version+"\n"
    extracted_lines.append(name)

f2.writelines(extracted_lines)