---
title: "What’s new with Dynamo Core 2.5?"
subTitle: "Có gì mới trong phiên bản Dynamo Core 2.5"
category: dynamo
cover: cover.png
---

Chào mừng các bác đã ghé thăm blog của mình.

---

Hôm nay mình sẽ cùng tản mạn với các bác sự mới mẻ trong phiên bản **Dynamo Core** 2.5 lần này, mỗi ngày ta đều có thể cảm nhận rằng **Dynamo** bây giờ đã hỗ trợ tốt hơn rất nhiều so với ngày xưa rất nhiều, đặc biệt nhất vẫn là cải tiến hiệu năng ổn định ở phiên bản **Dynamo** 2.1, Vậy thì mình sẽ điểm danh qua những tính năng hay ho có trong bản 2.5 này nhé.
### Cải tiến :
 Không gian làm việc với các Package của **Dynamo** đã sịn sò hơn rất nhiều, mình vẫn thích cái hay ho nhất mà nó cải tiến đó là nếu mình thiếu [Package](https://dynamopackages.com/) nào, **Dynamo** sẽ tự động nhận dạng và tải về cho mình những package bị thiếu đó, nghe thôi đã phê rồi, nhưng chú ý là chỉ hỗ trợ cho các thư viện viết với [ZeroTouch](https://github.com/DynamoDS/Dynamo/wiki/Zero-Touch-Plugin-Development), bởi vậy các ông bự thi nhau qua C# viết hết rồi đấy các bác.Riêng mình thì mình lại thích viết với **python** hơn vì nó ngắn gọn và muốn đổi sang bài toán khác thì vào sửa **Scripts** luôn không phải build chi mệt xác.
![](https://github.com/chuong9x/DataBlog/blob/master/Whats%20New%20In%20Dynamo%20Core%202.5/WorkspaceReferences_Dynamo2.5.jpg?raw=true)

Vấn đề ngày xưa học mãi không được đó là sử dụng **Scripts** của người khác mà không để lại một lời nhắn nhủ thì bạn sẽ tìm mỏi mắt cho cái **Node** đó, lỗi thì chỉ báo là thiếu, ai mà biết thiếu cái gì, vậy thì ở bản này, **Dynamo** tiện tay cải tiến luôn khoảng đó rồi các bác ạ,các lỗi từ Node **dll** hoặc các node viết với **PythonScripts** sẽ báo nội dung đầy đủ và rõ ràng hơn.Giúp cho mình còn biết ở đâu mà sửa lỗi chứ, hạn chế những lỗi trước đây như lỗi code dòng 28 mà báo ở dòng 15 làm cuống cuồng lên fix bug cong cả đít.
![](https://github.com/chuong9x/DataBlog/blob/master/Whats%20New%20In%20Dynamo%20Core%202.5/UnresolvedNode_ErrorMessages2.jpg?raw=true)

Hiệu suất thì mình không bàn ở bản 2.1 trở lên rồi, thuật toán tìm kiếm các **Node** cũng thay đổi, đường dẫn và lưu trữ của **Dynamo Core** rồi chạy ở Revit 2020 hoàn toàn là một cuộc cải cách lớn thay đổi nốt,còn việc hiệu suất nó cải tiến đến đâu thì phải chạy thử dự án mới biết được.Mình nghĩ bây giờ nên viết các Scripts với Dynamo 2.0 trở lên là được rồi, tiện dùng cho sau này đỡ phải sửa tới sửa lui nhức cả nách.

Nói đi cũng phải nói lại , vấn đề lớn nhất của **Dynamo** vẫn chưa giải quyết được là ở [Geometry](https://primer.dynamobim.org/05_Geometry-for-Computational-Design/5-1_geometry-overview.html), Nếu để **Geometry** sinh ra quá nhiều Solid rồi đem xử lí các điểm giao đối tượng nhiều nhiều một chút là tắt nắng ngay, có bác chỉ dùng hàm [Dispose](https://www.revitapidocs.com/2015/4c6eef15-6691-4675-600c-7a12a09738f9.htm) nhưng mình thấy vẫn văng như thường.

Ngoài ra còn có rất nhiều tính năng hay ho và tải tiến các **Node** mà mình không đề cập trong bài viết này, các bác có thể xem thêm tại bên dưới link tham khảo để biết chi tiết hơn.

---

#### Tổng kết
Vậy là mình đã kể cho các bác nghe xong hết câu chuyện rồi đó , hôm nào **Dynamo** cập nhật có gì hay ho mình lại xông pha kể cho các bác nghe, bên trên chỉ là ý kiến cá nhân từ phía một người, hi vọng sẽ nhiều bác trải nghiệm rồi quay lại đây góp ý cùng a e nhé ! 

### Tham khảo :

[Dynamo Forum](https://forum.dynamobim.com/t/loop-introduce-multiple-parameters-to-an-instance-element/26825/3)

[Dynamo Github](https://github.com/DynamoDS/Dynamo/wiki/Release-Notes#251)
