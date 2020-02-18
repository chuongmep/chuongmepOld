---
title: "Export PCF From Revit With Dynamo And Addin"
subTitle: "Xuất tệp PCF từ Revit với Dynamo và Addin"
category: revitapi
cover: cover.png
---

Chào mừng các bác đã ghé thăm blog của mình.😄

 Các tệp PCF thường  được sử dụng trong ngành công nghiệp đường ống để tự động hóa một loạt quy trình, chẳng hạn như phân tích ứng suất, tạo ra các tài liệu (như isometrics) và thậm chí để tự động hóa thiết bị của cửa hàng.

 Công cụ tạo PCF trong Revit giống như những gì đã được sử dụng trong Autodesk Fabrication CADmep và được một số người dùng sử dụng để tạo ra hình học. Miễn là các bác đang sử dụng các đường ống dựa trên Fabrication trong Revit, các bác có thể sử dụng macro tương đối đơn giản để xuất tệp PCF, bao gồm ống ác các kiểu, phụ kiện, van và ti treo.

---
### Cách 1 : Sử dụng Dynamo Scripts

```
#Khai báo thư viện
import clr
clr.AddReference('ProtoGeometry')
from Autodesk.DesignScript.Geometry import *
clr.AddReference('RevitAPI')
import Autodesk
from Autodesk.Revit.DB import *
FU = Autodesk.Revit.DB.Fabrication.FabricationUtils
clr.AddReference("RevitServices")
import RevitServices
from RevitServices.Persistence import DocumentManager
from RevitServices.Transactions import TransactionManager
clr.AddReference('RevitAPI')
from Autodesk.Revit.DB import *
clr.AddReference('RevitAPIUI')
import Autodesk
from Autodesk.Revit.UI import *
doc = DocumentManager.Instance.CurrentDBDocument
uidoc = DocumentManager.Instance.CurrentUIApplication.ActiveUIDocument

# Mã chính
path = IN[1]
def get_selected_elements():
	ids = uidoc.Selection.GetElementIds()
	if isinstance(ids, list) == True:
		ids=[ids]
	els = []
	for id in ids:
		el = doc.GetElement(id)
		els.append(el.Id)
	return els

# Khởi tạo một Transaction để can thiệp vào Revit
TransactionManager.Instance.EnsureInTransaction(doc)
els = get_selected_elements()
FU.ExportToPCF(doc,els,path)
TransactionManager.Instance.TransactionTaskDone()		
OUT = "Done"
```
Cuối cùng ta sẽ có một cái gì đó như này với **Path** đầu vào chính là đường dẫn các bác muốn xuất ra

![](https://github.com/chuong9x/DataBlog/blob/master/PCF%20Export/PCF_Export.png?raw=true)



### Cách 2 : Sử dụng Revit API Viết mã với `C#`

```
    [Transaction(TransactionMode.Manual)]
    [Regeneration(RegenerationOption.Manual)]
    public class ExportPCF : IExternalCommand
    {
        public Result Execute(ExternalCommandData commandData, ref string message, ElementSet elements)
        {
            var uiapp = commandData.Application;
            var uidoc = uiapp.ActiveUIDocument;
            var app = uiapp.Application;
            var doc = uidoc.Document
            var dummyFileName = "IsoMetric.PCF";

            var sf = new SaveFileDialog();
            // Feed the dummy name to the save dialog
            sf.FileName = dummyFileName;
            sf.Filter = @"PCF file (*.PCF)|*.PCF";
            try
            {
                if (sf.ShowDialog() == DialogResult.OK)
                {
                    ICollection<ElementId> selection = uidoc.Selection.GetElementIds();
                    var savePath = sf.FileName;
                    FabricationUtils.ExportToPCF(doc, selection.ToList(), savePath);

                }
                MessageBox.Show("Successful", "Export PCF");
            }
            catch (Exception e)
            {
                //MessageBox.Show("Please Design to Fabrication", "Message");
                //return Result.Cancelled;
                throw new Exception(e.Message);
            }
            return Result.Succeeded;
        }
    }
```

### Kết quả của cả hai cách trên 

![](https://github.com/chuong9x/DataBlog/blob/master/PCF%20Export/PCF_002.png?raw=true)

### Mở rộng 

Hiện đang có một dự án phát triển bời nhà phát triển <a href="https://github.com/shtirlitsDva" target="_blank">shtirlitsDva</a>, các bác có thể xem tại <a href="https://github.com/shtirlitsDva/Revit-PCF-Exporter" target="_blank">đây</a> hoặc nếu cám thấy hứng thú với chủ đề này thì phụ bác ấy một tay nhé, mã nguồn mở mà 😍

### Tổng kết

Vậy là mình đã kể cho các bác nghe xong hết câu chuyện nữa rồi đó, cứ thấy gì đó vui vui hay hay là mình lại viết lên cho a e tham khảo và góp ý, nếu có ý tưởng gì giúp cải thiện nhanh hơn thì các bác bình luận bên dưới nhé, mình sẽ bổ sung để bài viết được hoàn thiện hơn.Cám ơn các bác đã ghé thăm blog của mình !

### Tham khảo :

<a href="https://blogs.autodesk.com/revit/2017/07/26/exporting-pcf-files-from-revit/?_ga=2.175766946.123799178.1581520246-2029095642.1581002495" target="_blank">Autodesk Blog</a>  


