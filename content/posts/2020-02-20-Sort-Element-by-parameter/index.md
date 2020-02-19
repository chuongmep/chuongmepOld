---
title: "Sort Element By Parameter Dynamo RevitAPI"
subTitle: "Làm thế nào để lọc đối tượng theo parameter"
category: dynamo,revitapi,python
cover: cover.png
---

Chào mừng các bác đã ghé thăm blog của mình.😄

### Mở đầu
 Khi nào thì mình cần sử dụng cái này, đó là lúc mình lấy ra các đối tượng nhưng lại muốn chúng sắp xếp theo một parameter nào đó, ví dụ mình muốn sắp xếp các room theo diện tích chẳng hạn, vân vân và mây mây. Dưới đây sẽ giải quyết thắc mắc của nhiều các bác .
 
---
### Dynamo
Mình sẽ sử dụng `List.SortByFunction` và sắp xếp lại chúng theo paramter, đầu vào chính là một list Element, đầu ra chính là những phòng có diện tích từ lớn đến bé nhờ `List.Reverse`.

![](pic/SortPraDynamo.png)

### Revit API C#

Mình sử dụng thư viện Linq với **OrderBy** để làm được điều này, các bác lưu ý là **OrderBy** có thể sử dụng khi mình chuyển qua list trước nhé .
```
FilteredElementCollector Rooms = new FilteredElementCollector(xdoc);
            temc.WherePasses(rmfilter).WhereElementIsNotElementType();

            IOrderedEnumerable<Element> rooom =
                Rooms.ToList().OrderBy(x => x.get_Parameter(BuiltInParameter.ROOM_AREA).AsDouble());
            IEnumerable<Element> RoomSort = rooom.Reverse();
```
### Python 

RoomSort = sorted(Room, key = lambda x:x.get_Parameter(BuiltInParameter.ROOM_AREA).AsDouble())
OUT = RoomSort.reverse()

### Tổng kết

Vậy là mình đã kể cho các bác nghe xong hết câu chuyện nữa rồi đó, cứ thấy gì đó vui vui hay hay là mình lại viết lên cho a e tham khảo và góp ý, nếu có ý tưởng gì giúp cải thiện nhanh hơn thì các bác bình luận bên dưới nhé, mình sẽ bổ sung để bài viết được hoàn thiện hơn.Cám ơn các bác đã ghé thăm blog của mình !

### Tham khảo :
