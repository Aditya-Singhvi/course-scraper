import json

handle = open("data.json")
writer = open("data.csv", 'w')

writer.write("courseName, semester, teacherLastName, teacherFirstName, p1, p2, p3, p4, p5, p6, p7\n")

data = handle.read()

info = json.loads(data)
print(len(info))

for item in info:
    fullInfo = [x.strip() for x in item['name'].split("/")]
    courseName = fullInfo[0]
    semester = fullInfo[1]
    teacher = fullInfo[2]
    periods = item['periods']
    for i in range(1, 8):
        if str(i) in periods:
            fullInfo.append('Y')
        else:
            fullInfo.append('N')
    writer.write(str(fullInfo)[1:-1].replace("'", ""))
    writer.write('\n')
