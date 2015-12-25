# my-resume-like-tmall

#开发中遇到的坑
###在开发商品详情页时候，个人博客鼠标移入后在IE5-7中z-index时效
原因是：IE7及更早版本对z-index的解析有个讨厌的Bug，如果父元素具有position: relative/absolute;属性，那么只设置子元素的z-index是不起作用的，父元素也得一起设置。也就是说必须把要控制元素和它上层的所有DIV都加上z-index才行。