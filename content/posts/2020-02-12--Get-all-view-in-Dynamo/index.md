---
title: "Get All View In Dynamo"
subTitle: "Lấy về tất cả các View trong Dynamo"
category: dynamo
cover: cover.jpg
---

Chào mừng các bác đã ghé thăm blog của mình.😄

---

Các bác sử dụng Python Scripts này để lấy về tất cả các View có trong Revit nhé ! 

### Bước 1 : Khai báo thư viện
```
import clr
clr.AddReference('ProtoGeometry')
from Autodesk.DesignScript.Geometry import *

# Import DocumentManager and TransactionManager
clr.AddReference("RevitServices")
import RevitServices
from RevitServices.Persistence import DocumentManager
from RevitServices.Transactions import TransactionManager

# Import RevitAPI
clr.AddReference("RevitAPI")
import Autodesk
from Autodesk.Revit.DB import *

# Import ToDSType(bool) extension method
clr.AddReference("RevitNodes")
import Revit
clr.ImportExtensions(Revit.Elements)
```
### Bước 2 : Khai báo giá trị truyền vào để làm mới lại danh sách view
```
Refresh = IN[0]
```
### Bước 3 : Lấy về Tất cả các View có trong mô hình với [FilteredElementCollector](https://www.revitapidocs.com/2015/263cf06b-98be-6f91-c4da-fb47d01688f3.htm)
```
doc = DocumentManager.Instance.CurrentDBDocument
collector = FilteredElementCollector(doc)
views = collector.OfClass(View).OfCategory(BuiltInCategory.OST_Views).ToElements()
```
### Bước 4 : Cho List vào vòng lặp và lấy ra từng view một với điều kiện

```
OUT = list(view.ToDSType(True) for view in views if not view.IsTemplate)
```
Cuối cùng mình sẽ có một Scripts hoàn chỉnh như thế này,Phía trước truyền vào [Boolean](https://primer.dynamobim.org/04_The-Building-Blocks-of-Programs/4-3_logic.html) chính là Làm mới hoặc cập nhật lại :
![](https://github.com/chuong9x/DataBlog/blob/master/GetAllViewInDynamo/GetAllView.png?raw=true)

### Mở rộng

Ngoài những cách làm bên trên: 

Mình có thể dùng một gói của [archi-lab](https://archi-lab.net/)

![](https://github.com/chuong9x/DataBlog/blob/master/GetAllViewInDynamo/906df8d59dddc2e7ff75b6f0c88e70ba47cb5312.png?raw=true)

Mình có thể dùng **GetViewsByType** của gói [Modelical](https://www.modelical.com/en/modelical-package-for-dynamo/).Tiền thân của gói này là từ **archi-lab** nhưng không được để lại ở những phiên bản đời cao.

![](https://github.com/chuong9x/DataBlog/blob/master/GetAllViewInDynamo/GetAllVieByType.png?raw=true)


#### Tổng kết
Vậy là mình đã kể cho các bác nghe xong hết câu chuyện rồi đó , hôm nào rảnh rỗi lại tiếp tục kể cho các bác nghe về một diễn biến chiến trường khác, cám ơn các bác đã ghé thăm blog !

### Tham khảo :

[Dynamo Forum](https://forum.dynamobim.com/t/get-all-views-node/4494/5)

[Dynamo Github](https://primer.dynamobim.org/10_Custom-Nodes/10-6_Python-Templates.html)
