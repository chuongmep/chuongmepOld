---
title: "Purge Line-Filter-ViewTemplate Dynamo Revit"
subTitle: "Xóa bỏ Line-Bộ lọc-ViewTemplate trong Dynamo Revit"
category: dynamo
cover: cover.png
---

Chào mừng các bác đã ghé thăm blog của mình.😄

Hôm nay lại quay lại với chủ đề dọn rác , đúng là cái này trong Revit vẫn chưa tối ưu ngon được , nên nhiều anh em vẫn đang loay hoay mày mò làm tool cho mấy vụ như này, Hi vọng Python Scripts bên dưới có thể phần nào giúp được các bác trong công việc hoặc biết đâu lại chế tác lại thành một ý tưởng khác.

---
### Delete Unused View Templates

```
import clr
clr.AddReference('RevitAPI')
from Autodesk.Revit.DB import *
import Autodesk

clr.AddReference("RevitServices")
import RevitServices
from RevitServices.Persistence import DocumentManager
from RevitServices.Transactions import TransactionManager
from RevitServices.Persistence import DocumentManager

#The inputs to this node will be stored as a list in the IN variables.

bool = IN[0]
output = ""

doc = DocumentManager.Instance.CurrentDBDocument
collector = FilteredElementCollector(doc)
allviews = collector.OfClass(View).ToElements()
viewlist = []

for v in allviews:
	if v.ViewType == ViewType.ThreeD:
		if not(v.IsTemplate):
			viewlist.append(v)
	else:
		viewlist.append(v)

views = UnwrapElement(viewlist)

viewTemplates = []
for v in views:
	if v.IsTemplate:
		viewTemplates.append(v)

usedTemplates = []
for v in views:
	if v.ViewTemplateId.IntegerValue != -1:
		usedTemplates.append(v.Document.GetElement(v.ViewTemplateId))

uniqueUsedTemplates = []

if len(usedTemplates) != 0:
	uniqueUsedTemplates.append(usedTemplates[0])
	for used in usedTemplates:
		buffer = False
		for unique in uniqueUsedTemplates:
			if used.Name == unique.Name:
				buffer = False
				break
			else:
				buffer = True
		if buffer:
			uniqueUsedTemplates.append(used)

indexes = []
i = 0
for v in viewTemplates:
	for u in usedTemplates:
		if u.Name == v.Name:
			indexes.append(i)
			break
	i = i + 1

indexes.reverse()

for i in indexes:
	viewTemplates.pop(i)

viewTemplatesID = []
viewTempNames = []

if bool == True:
	for v in viewTemplates:
		viewTemplatesID.append(v.Id)

	TransactionManager.Instance.EnsureInTransaction(doc)

	for v in viewTemplatesID:
		viewTempNames.append(doc.GetElement(v).Name)
		doc.Delete(v)

	TransactionManager.Instance.TransactionTaskDone()
	output = viewTempNames

OUT = output
```

### Delete Line Patterns

```

import clr

#Load Revit API
clr.AddReference('RevitAPI')
from Autodesk.Revit.DB import *
import Autodesk

#Load document reference
clr.AddReference("RevitServices")
import RevitServices
from RevitServices.Persistence import DocumentManager
from RevitServices.Transactions import TransactionManager

doc = DocumentManager.Instance.CurrentDBDocument
uiapp = DocumentManager.Instance.CurrentUIApplication
app = uiapp.Application

bool = IN[0]

collector = FilteredElementCollector(doc)
allLinePatterns = collector.OfClass(LinePatternElement).ToElements()

linePatternsNames = UnwrapElement(allLinePatterns)
output = ""
delLinePatternsId = []

if bool == True:
	for l in linePatternsNames:
		if l.Name.startswith("IMPORT"):
			delLinePatternsId.append(l.Id)
	output = str(len(delLinePatternsId)) + " Line Patterns have been deleted"

	TransactionManager.Instance.EnsureInTransaction(doc)

	for l in delLinePatternsId:
		doc.Delete(l)

	TransactionManager.Instance.TransactionTaskDone()

OUT = output
```

### Delete Unused Filters

```

import clr
clr.AddReference('ProtoGeometry')
from Autodesk.DesignScript.Geometry import *

clr.AddReference("System.Core")
import System.Linq
clr.ImportExtensions(System.Linq)

clr.AddReference("RevitAPI")
import Autodesk.Revit
from Autodesk.Revit.Exceptions import InvalidOperationException
from Autodesk.Revit.DB import *
from Autodesk.Revit.DB import ElementId
from System.Collections.Generic import *

# Import ToDSType(bool) extension method
clr.AddReference("RevitNodes")
import Revit
clr.ImportExtensions(Revit.Elements)

# Import DocumentManager
clr.AddReference("RevitServices")
import RevitServices
from RevitServices.Persistence import DocumentManager
from RevitServices.Transactions import TransactionManager
from RevitServices.Persistence import DocumentManager

def GetFilterIds(view):
  filterIds = None
  try:
    filterIds = view.GetFilters()
  except InvalidOperationException, e:
    filterIds = None
  return filterIds

def GetUsedFilterIds(doc):
  views = FilteredElementCollector(doc).OfClass(View).ToElements()
  usedFilterIds = []
  for view in views:
    viewFilterIds = []
    try:
      viewFilterIds = view.GetFilters()
    except InvalidOperationException, e:
      pass # this exception happens when a view doesn't support filters
    usedFilterIds.extend(viewFilterIds)
  return usedFilterIds

def GetUnusedFilters(doc):
  usedFilterIds = GetUsedFilterIds(doc).ToList[ElementId]()
  unusedFilters = FilteredElementCollector(doc).OfClass(ParameterFilterElement).Excluding(usedFilterIds).ToElements()
  return list(f.ToDSType(True) for f in unusedFilters)

#The inputs to this node will be stored as a list in the IN variables.

bool = IN[0]
output = ""

doc = DocumentManager.Instance.CurrentDBDocument

filters = GetUnusedFilters(doc)
filters2 = UnwrapElement(filters)
filtersID = []
filtersNames = []

if bool == True:
	for f in filters2:
		filtersID.append(f.Id)

	TransactionManager.Instance.EnsureInTransaction(doc)

	for f in filtersID:
		filtersNames.append(doc.GetElement(f).Name)
		doc.Delete(f)

	TransactionManager.Instance.TransactionTaskDone()
#Assign your output to the OUT variable.
OUT = filtersNames
```
### Kết quả

![](https://github.com/chuong9x/DataBlog/blob/master/Purge%20Line-Filter-ViewTemplate/Purge%20Line-Filter-ViewTemplate.png?raw=true)


### Tổng kết

Vậy là mình đã kể cho các bác nghe xong hết câu chuyện nữa rồi đó, cứ thấy gì đó vui vui hay hay là mình lại viết lên cho a e tham khảo và góp ý, nếu có ý tưởng gì giúp cải thiện nhanh hơn thì các bác bình luận bên dưới nhé, mình sẽ bổ sung để bài viết được hoàn thiện hơn.Cám ơn các bác đã ghé thăm blog của mình !

### Tham khảo :

[parametricmonkey](https://parametricmonkey.com/2016/03/09/get-unused-filters/)

[archi-lab.net](https://archi-lab.net/delete-imported-line-patterns-using-dynamo/)