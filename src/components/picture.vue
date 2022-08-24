<template>
  <div class="upload-picture-card" :key="fileKey">
    <el-upload
      multiple
      ref="pictureCard"
      accept=".png, .jpg, .jpeg"
      :action="uploadImgUrl"
      :headers="headers"
      :file-list="fileList"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-upload="handleBeforeUpload"
      :on-error="handleUploadError"
      :on-success="handleUploadSuccess"
      list-type="picture-card"
    >
      <i class="el-icon-plus"></i>
      <!-- 上传提示 -->
      <div class="el-upload__tip" slot="tip" v-if="showTip">
        请上传
        <template v-if="fileSize">
        大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b>
        </template>
        <template v-if="fileType">
         格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b>
        </template>
        的文件
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" title="预览" width="800" append-to-body>
      <img :src="dialogImageUrl" style="display: block; max-width: 100%; margin: 0 auto;">
    </el-dialog>
  </div>
</template>
<script>

  
import { getToken } from "@/utils/auth";
export default {
  props: {
    //值
    value: {
      type: Array,
      default(){
        return []
      },
    },
    // 大小限制(MB)
    fileSize: {
      type: Number,
      default: 5,
    },
    // 是否显示提示
    isShowTip: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl:'',
      uploadImgUrl: process.env.VUE_APP_BASE_API + "/file/upload", // 上传的图片服务器地址
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      fileType: ["png", "jpg", "jpeg"],
      fileList: [],
      fileKey: Math.random()
    };
  },
  computed: {
    // 是否显示提示
    showTip() {
      return this.isShowTip && (this.fileType || this.fileSize);
    },
    // 列表
    list: {
      get: function() {
        let temp = 1;
        if (this.value) {
          // 首先将值转为数组
          const list = Array.isArray(this.value) ? this.value : [this.value];
          // 然后将数组转为对象数组
          return list.map((item) => {
            if (typeof item === "string") {
              item = { name: item, url: item };
            }
            item.uid = item.uid || new Date().getTime() + temp++;
            return item;
          });
        } else {
          this.fileList = [];
          return [];
        }
      },
      set: function() {
      }
    },
    valueList(){
      return this.value;
    }
  },
  watch:{
    value:{
      handler(newVal){
        if(!newVal || newVal.length <= 0)this.fileKey = Math.random();  //利用随机数清除组件缓存
      },
      deep: true,
      immediate: true
    },
    list:{
      handler(newVal){
        this.fileList = newVal;
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 上传前校检格式和大小
    handleBeforeUpload(file) {
      // 校检文件类型
      if (this.fileType) {
        let fileExtension = "";
        if (file.name.lastIndexOf(".") > -1) {
          fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
        }
        const isTypeOk = this.fileType.some((type) => {
          if (file.type.indexOf(type) > -1) return true;
          if (fileExtension && fileExtension.indexOf(type) > -1) return true;
          return false;
        });
        if (!isTypeOk) {
          this.$message.error(
            `文件格式不正确, 请上传${this.fileType.join("/")}格式文件!`
          );
          return false;
        }
      }
      // 校检文件大小
      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize;
        if (!isLt) {
          this.$message.error(`上传文件大小不能超过 ${this.fileSize} MB!`);
          return false;
        }
      }
      return true;
    },
    // 预览
    handlePreview(file){
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 删除
    handleRemove(file, fileList){
      const url = file.response ? file.response.data.url : file.url;
      const index = this.valueList.findIndex(v => v == url);
      if(index != -1)this.valueList.splice(index,1);
      
      this.$emit("input", this.valueList);
    },
    // 上传失败
    handleUploadError(err) {
      this.$message.error("上传失败, 请重试");
    },
    // 上传成功回调
    handleUploadSuccess(res, file) {
      this.$message.success("上传成功");
      //this.$emit("input", res.data.url);
      this.valueList.push(res.data.url);
      this.$emit("input",this.valueList);
    },
  },
};
</script>
<style>
.el-upload__tip {
  line-height: 1.2;
}
</style>
