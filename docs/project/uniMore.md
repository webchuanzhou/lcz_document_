<!--
 * @Author: lcz
 * @Date: 2021-06-11 17:16:35
 * @LastEditTime: 2021-06-11 17:22:24
 * @LastEditors: Please set LastEditors
 * @Description: uni-app多端开发
 * @FilePath: \lcz_document\docs\project\uniMore.md
-->
## 16.//图片上传

可能会遇见的问题：安卓返回图片路径小写，ios返回图片路径后缀大写，后端不兼容上传大小写报错

```html

  uni.chooseImage({
    count:1,
      success: (chooseImageRes) => {
          // 获取的格式是数组，多选会同时返回，单选只返回一项
          const tempFilePaths = chooseImageRes.tempFilePaths;
      console.log(chooseImageRes)
      uni.showLoading({
          title: '加载中'
      });
      this.$store.dispatch('upload',tempFilePaths).then(res=>{
        console.log(res,23131)
        uni.hideLoading();
        if(res.code !='0'){
          this.form.avatar = res.data.url;
          this.updateUserInfo();
        }
      })
      }
  });

	upload({ commit },tempFilePaths){
			return new Promise((resolve, reject) => {
				// 若多选，需循环调用uni.uploadFile ，因微信小程序只支持单文件上传
				// console.log(tempFilePaths[0],222)
				let file = tempFilePaths[0]
				// // #ifdef APP-PLUS
				// 	let suffix = file.substring(file.lastIndexOf(".")+1).toLowerCase();
				// 	let arr = file.split('.');
				// 	arr[arr.length-1] = '.' + suffix 
				// 	file = arr.join('')
				// 	console.log(file) 
				// // #endif
				uni.uploadFile({
				    url: configs.BASE_URL + '/image/upload', //仅为示例，非真实的接口地址
				    filePath: file,
				    name: 'file',
					header: {
						// 'Content-Type': 'multipart/form-data',
						Authorization: uni.getStorageSync('token'),
					},
				    // formData: {
				    //     'user': 'test'  // 上传附带参数
				    // },
				    success: (uploadFileRes) => {
				        // 根据接口具体返回格式   赋值具体对应url
						let data = JSON.parse(uploadFileRes.data);
						if(data.code =='0'){
							uni.showToast({
								title:data.message,
								icon:'none'
							})
						}
						resolve(data)
				    },
					fail:(e) => {
						reject(e)
					}
				});
			})
		},
```