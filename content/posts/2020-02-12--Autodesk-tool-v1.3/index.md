---
title: "Autodesk Tool V1.3"
subTitle: "Sửa lỗi thông báo yêu cầu bản quyền Autodesk"
category: tools
cover: cover.png
---

Chào mừng các bác đã ghé thăm blog của mình.😄

---
### Tại sao lại có tool này ?

Vào một ngày đẹp trời, tự nhiên thánh thần thiên địa đang làm ngon lành đâu nổi lên cái thông báo sài bản quyền lậu khá dị hợm. 

![](https://github.com/chuong9x/DataBlog/blob/master/AutodeskToolsV1.3/68340972_10219632495829817_9042702193144102912_n-768x563.jpg?raw=true)

Ủa ủa cái gì đây trời.Và cuối cùng là gỡ cái key rồi nhét lại cũng không được, làm tốn cả buổi mò cua bắt ốc làm đi làm lại , cuối cùng phát hiện ra hệ thống thăm dò key của Autodesk.Thôi code vài dòng gỡ cho đỡ tức.😁

```
import os
X = os.getenv('USERPROFILE')
Y = "\Autodesk\Genuine Service\message_router.exe"
Path = X+Y
os.remove(Path)

```
Không dừng lại ở đó , mình và thằng em trong phòng quyết định phát triển thêm một cái tool con có giao diện để xử lí triệt để luôn vụ này với mục đích sử dụng : 
- Delete All Key : Xoá toàn bộ key Autodesk lưu trữ trên máy người dùng.
- Reset Key : Xoá key lỗi , tiến hành khôi phuc lại giao diện kích hoạt key cho người dùng.
- Copyring Lock Autodesk : Ngăn chặn thông báo bản quyền sử dụng trái phép hoặc key không hợp lệ từ Autodesk.
- Kill All : Xoá sạch mọi nội dung liên quan đến key cài đặt, bản quyền, lỗi kích hoạt.

Giao diện tool :

![](https://github.com/chuong9x/DataBlog/blob/master/AutodeskToolsV1.3/68285419_10219713020122874_6470352159656378368_n.jpg?raw=true)

Link tải về mình để ở [Đây](http://www.mediafire.com/file/at5tjk5qjcjavf8/Autodesk_Tools_V1.3.exe/file), bác nào bị thì có thể bế e nó về chạy .


### Lưu ý 
Đây không phải là công cụ bẻ khóa gì cả nhé và hoàn toàn là chân chính, chỉ dọn sạch cái key có trong máy cho người dùng đi mà thôi 😁

### Tổng kết

Vậy là mình đã kể cho các bác nghe xong hết câu chuyện nữa rồi đó, cứ thấy gì đó vui vui hay hay là mình lại viết lên cho a e tham khảo và góp ý, nếu có ý tưởng gì giúp cải thiện nhanh hơn thì các bác bình luận bên dưới nhé, mình sẽ bổ sung để bài viết được hoàn thiện hơn.Cám ơn các bác đã ghé thăm blog của mình !

### Tham khảo
