//属性栏js部分
//属性栏js部分
        //获取元素
        var property = document.querySelector(".property");
        var propertyLis = property.querySelectorAll('.propertyLi');
        var items = document.querySelectorAll('.item');

        //for循环绑定点击事件
        for (var i = 0; i < propertyLis.length; i++) {
            //开始给所有li设定索引号
            propertyLis[i].setAttribute('index', i);
            propertyLis[i].onclick = function () {
                //排他思想，其余的li先清除class
                for (var i = 0; i < propertyLis.length; i++) {
                    propertyLis[i].className = 'propertyLi';
                }
                //留下自己
                this.className = 'propertyLi current';
                //下面显示内容模块
                var index = this.getAttribute('index');
                //排他思想，把其他item全部隐蔽
                for (var i = 0; i < items.length; i++) {
                    items[i].style.display = 'none';
                }
                //留下对应的item显示
                items[index].style.display = 'block';
            }
        }