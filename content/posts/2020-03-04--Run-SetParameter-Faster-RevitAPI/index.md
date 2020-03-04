---
title: "Debug Command Without Restart Revit"
subTitle: "Gỡ lỗi mã không cần khởi động lại Revit"
category: revitapi
cover: cover.png
---

Chào mừng các bác đã ghé thăm blog của mình.😄

### Mục đích 

- Bài viết này viết ra để nhắc nhở mọi người dùng sử dụng mã tốt hơn để viết cho công cụ của mình tốt hơn mà thôi, vấn đề này xảy ra khi ta vô tình bỏ một transaction trong vòng lặp.
 ví dụ đơn giản bên dưới sẽ giúp bạn hình dung được tác hại khi transaction được đặt sai chỗ.

### Nên sử dụng 

```
using (Transaction tran = new Transaction(doc, "Set Parameter"))
            {
                tran.Start();
                foreach (Element e in elements)
                {
                    
                    Parameter p = e.get_Parameter(BuiltInParameter.ALL_MODEL_INSTANCE_COMMENTS);
                    p?.Set(_viewModel.TxtStatus);
                    e.Dispose();
                }
                tran.Commit();
            }
```
### Không nên sử dụng
```
using (Transaction tran = new Transaction(doc, "Set Parameter"))
			{
				foreach(Element e in elementSet)
				{
					Parameter p = e.get_Parameter(BuiltInParameter.ALL_MODEL_INSTANCE_COMMENTS);
					tran.Start();
					p.Set(_viewModel.TxtStatus));
                    e.Dispose();
					tran.Commit();
				}
				
			}
```

### Kết luận vấn đề
Cả hai mã bên trên đều cho chạy tốt nhưng mã bên trên sẽ chạy nhanh hơn chỉ vì mình đặt một **tran.Start** bên ngoài vòng lặp,bạn hãy tưởng tượng với mỗi vòng lặp sẽ thực hiện start lại một **transaction**, như vậy có nguy hiểm không chứ, kết luận cuối cùng là ta nên sử dụng với cách đầu tiên để mã chúng ta chạy một cách tối ưu nhất nhé.Nếu các bác không tin điều đó, hãy thử kiểm tra với vài ngàn đối tượng thử xem 😄.

### Tổng kết

Vậy là mình đã kể cho các bác nghe xong hết câu chuyện nữa rồi đó, cứ thấy gì đó vui vui hay hay là mình lại viết lên cho a e tham khảo và góp ý, nếu có ý tưởng gì giúp cải thiện nhanh hơn thì các bác bình luận bên dưới nhé, mình sẽ bổ sung để bài viết được hoàn thiện hơn.Cám ơn các bác đã ghé thăm blog của mình !
### Tham khảo :

Hồ Văn Chương