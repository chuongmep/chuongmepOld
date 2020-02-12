---
title: "Break string in Dynamo list with characters"
subTitle: "Làm thế nào để ngăn cách phần tử danh sách với kí tự"
category: dynamo
cover: cover.png
---

Chào mừng các bác đã ghé thăm blog của mình.

---

Hôm nay mình sẽ cùng tản mạn về làm như thế nào để ngăn cách được danh sách bởi một kí tự nhé, cách ngăn này mình thường dùng để chọn nhiều đối tượng trong Revit hơn từ một đám list **IdElement** thông qua nút chọn [Select by ID](https://knowledge.autodesk.com/support/revit-products/learn-explore/caas/CloudHelp/cloudhelp/2016/ENU/Revit-Troubleshooting/files/GUID-2B1CC22C-CB1F-45DA-B57B-62C36013D9E0-htm.html).Cơ bản là khi ngăn cách với nhau bằng dấu phẩy, thay vì bình thường ta chỉ chọn với một **IdElement** thì với ngăn cách dấu phẩy, ta dễ dàng lựa chọn hàng loạt các đối tượng.Cách thực hiện của mình đó chính là viết vài dòng [Code block](https://primer.dynamobim.org/07_Code-Block/7-1_what-is-a-code-block.html).

Sau đây là đoạn Scripts mình thực hiện để làm được điều đó.
### Bước 1 :
Sao chép đoạn code bên dưới vào [Code block](https://primer.dynamobim.org/07_Code-Block/7-1_what-is-a-code-block.html)
```
n = DSCore.List.Count(l);
result = l[0];
separator =",";
[Imperative]{
	for (i in 1..n-1){
		result = result + separator + l[i];
		}
	return = result;
};

```
#### Bước 2:
Nối danh sách đầu vào và đầu vào và thêm một Node [Watch](https://dynamonow.com/watch-node/) để xem thông tin thử nào.

![](https://github.com/chuong9x/DataBlog/blob/master/BreakStringDynamo/List.Separator.png?raw=true)
#### Bước 3:
Hoàn thiện lại node của mình  theo ý muốn và kết hợp với node [Clipboard](https://dynamonodes.com/2016/01/07/clipboard-sendto/) để sài thôi.

![](https://github.com/chuong9x/DataBlog/blob/master/BreakStringDynamo/String.Separator02.png?raw=true)

Nếu các bước trên bạn thực hiện vẫn chưa ra kết quả như mong muốn, bạn có thể tải gói **Dyn** mình đã gửi lên tham khảo [Tại đây](https://github.com/chuong9x/DataBlog/blob/master/BreakStringDynamo/String.Separator.dyn)

---

#### Tổng kết
Vậy là mình đã giúp các bạn ngăn cách được các đối tượng thật dễ dàng phải không nào, nếu thấy hay bạn hãy ghi chú lại , biết đâu sau này bạn sẽ thấy nó ở đâu và bạn muốn áp dụng cho một bài toán nào đó, chúc các bạn thành công!

### Tham khảo :

[Dynamo Forum](https://forum.dynamobim.com/t/loop-introduce-multiple-parameters-to-an-instance-element/26825/3)
