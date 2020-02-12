---
title: "Change Level MEP Revit In Dynamo"
subTitle: "Thay đổi Cao độ đối tượng MEP trong Revit với Dynamo"
category: dynamo
cover: cover.png
---

Chào mừng các bác đã ghé thăm blog của mình.😄

---

Hôm nay mình lại gặp vấn đề và lại có cái để nói nữa rồi, đó là làm sao để thay đổi được Level  trong mô hình MEP của đối tượng khớp với Level mà đối tượng đó đang đứng.Nguyên nhân phát sinh này từ chỗ lúc ta vẽ khó mà kiểm soát được những đối tượng trong mô hình của mình trùng khớp với level của tầng đó, vì nếu chọn sau tầng cao độ âm mình cũng vẽ như một dân chơi thực thụ, và như thế là mình lại có cái để làm nữa rồi hí hí . Mình sẽ úp sọt lại toàn bộ cách làm của mình như sau :

### Bước 1 : Phân tích

Các **Element** MEP được chia làm hai loại chính để set, đó là loại có **host** và loại không có **host**, đối với loại có host thì ta cần set biến Parameter là `Schedule Level`.Các **Element** nào không có host thì ta set cho Parameter `Level`.Các loại khác thì bị rơi vào danh sách đỏ loại trừ .Tiếp theo vấn để ở đây đối với MEP, các đối tượng không có host sẽ có đối tượng thay đổi level nhưng vị trí **Element** sẽ không thay đổi như : Pipe,Duct,CableTray,... .Các đối tượng là **Fitting** như Duct Fitting hoặc Pipe Fitting thì toi mạng thật, đối level là vị trí cũng bay theo luôn. Túm váy lại tới đây và mình tiến hành viết thôi.

### Bước 2 : Kéo dây

Mở Dynamo lên và kéo dây thôi các bác ơi 😄
Đầu tiên mình lấy về các đối tượng Element có trong View cái đã, mình sẽ sài Node **View** và Scripts này để lấy về tất cả các Element có trong view đã chọn.Nếu các bác muốn lấy về hết tất cả các View để người dùng chọn trong giao diện Form thì xem lại cái bài viết trước của mình ở [đây](https://chuongmep.com/Get-all-view-in-Dynamo/).

```
#GetAllElementInView
import clr
clr.AddReference('RevitAPI')
from Autodesk.Revit.DB import*
clr.AddReference('RevitServices')
from RevitServices.Persistence import DocumentManager

doc = DocumentManager.Instance.CurrentDBDocument

if isinstance(IN[0],list):
	views = UnwrapElement(IN[0])
else:
	views = [UnwrapElement(IN[0])]

OUT = [FilteredElementCollector(doc,v.Id).ToElements() for v in views];

```
Ngon lành cành đào, giờ trước tiên tìm cái nào có parameter có tên là `Schedule Level` lọc ra và loại mấy cái biến null rác đi, giải quyết gọn gàng cho phân tích 01 cái đã rồi mình tính tiếp.

![](https://github.com/chuong9x/DataBlog/blob/master/Change%20Level%20MEP/Filter.png?raw=true)

Giờ mình sẽ giải quyết cho khúc lằng nhằng kia, đối tượng nào là co tê cút thì cao độ sẽ dùng thuật toán thay đổi đi cho bằng lại với cái cao độ gốc , cái nào là ống ác thì để nguyên lại còn không thích thì cứ cộng trừ cũng chả sao.Mình có một đoạn Scripts để giải quyết gọn gàng cho vấn đề trên như sau :
```
#PackageMEPover
import clr
clr.AddReference('RevitAPI')
from Autodesk.Revit.DB import *
clr.AddReference("RevitNodes")
import Revit
clr.ImportExtensions(Revit.Elements)
clr.ImportExtensions(Revit.GeometryConversion)

clr.AddReference("RevitServices")
import RevitServices
from RevitServices.Persistence import DocumentManager
from RevitServices.Transactions import TransactionManager

doc = DocumentManager.Instance.CurrentDBDocument

element = UnwrapElement(IN[0])
ref_level = UnwrapElement(IN[1])
listout = []

TransactionManager.Instance.EnsureInTransaction(doc)

for i,x in enumerate(element):
	ref_levelid = ref_level.Id
	
	#familyinstances
	try:
		object_param_level = x.get_Parameter(BuiltInParameter.FAMILY_LEVEL_PARAM)
	
		object_level = doc.GetElement(object_param_level.AsElementId())
	
		object_param_offset = x.get_Parameter(BuiltInParameter.INSTANCE_FREE_HOST_OFFSET_PARAM)
	
		object_newoffset = object_param_offset.AsDouble() + object_level.Elevation - ref_level.Elevation
	
		object_param_level.Set(ref_levelid)
		object_param_offset.Set(object_newoffset)
		listout.append(x)
	#system families
	except:
		try:
			object_param_level = x.get_Parameter(BuiltInParameter.RBS_START_LEVEL_PARAM)
			
			object_param_level.Set(ref_levelid)
			listout.append(x)
		except:
			pass

TransactionManager.Instance.TransactionTaskDone()

OUT = listout
```
Đầu vào chính là những  mà ta đã lấy từ trong **view** ra, Level mình cần thay đổi cho đối tượng đó và đầu ra chính là danh sách các Element đã được thay đổi.

![](https://github.com/chuong9x/DataBlog/blob/master/Change%20Level%20MEP/All%20Element%20not%20Host.png?raw=true)

Vậy là ngon cơm rồi, giờ mình sẽ lấy nốt luôn cái đầu vào Level từ cái **view** đã chọn thông qua **GetParameterValueByName** với tên là `Associated Level` là đọc được ngay cái tên Level và dùng **GetLevelByName** của Package [Archilab](https://archi-lab.net/category/dynamo/) 
Xâu chuỗi nãy giờ mình làm lại là đã giải quyết xong bài toán rồi.Hình ảnh cuối cùng mình để ở [đây](https://github.com/chuong9x/DataBlog/blob/master/Change%20Level%20MEP/Change%20Level%20MEP.png?raw=true) cho bác nào nối chưa được.

### Bước 3 : Run
Công việc còn lại của mình là chọn **viewPlan** có level cần chạy và đi làm cốc Coffee thôi ! Nhớ đừng chọn nhầm sang View 3D nhé 😳.

Vì tính chất công việc sử dụng thường xuyên đã nhanh còn muốn nhanh hơn nữa nên mình đã **Build** em nó lên một Addin cài đặt luôn cho dễ sử dụng, bác nào có nhu cầu sử dụng có thể để lại lời nhắn hoặc nhắn tin riêng với mình để bế em nó về sử dụng nhé.Nếu có dịp mình sẽ hướng dẫn đến phần viết Addin này.😄

Giao diện đồ họa của em nó : 

![](https://github.com/chuong9x/DataBlog/blob/master/Change%20Level%20MEP/ChangeLevelTool.png?raw=true)

Addin này làm được những gì: 
- Cho phép chọn nhiều đối tượng với nhiều cách hơn, có thể chọn với pick,view đang sử dụng hoặc danh sách view lựa chọn bởi người dùng.
- Bao quát trường hợp, sử dụng cho cả Revit 2020 với sự thay đổi cấu kiện.
- Tốc độ xử lý nhanh gọn hơn.

Đây là cách sử dụng Tool Demo cho em nó : [Click Here](https://www.youtube.com/watch?v=SPoOvjVGz5g)

#### Tổng kết
Vậy là mình đã kể cho các bác nghe xong hết câu chuyện nữa rồi đó, cứ thấy gì đó vui vui hay hay là mình lại viết lên cho a e tham khảo và góp ý, nếu có ý tưởng gì giúp cải thiện nhanh hơn thì các bác bình luận bên dưới nhé, mình sẽ bổ sung để bài viết được hoàn thiện hơn.Cám ơn các bác đã ghé thăm blog của mình !

### Tham khảo :



