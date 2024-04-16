<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:icon:add']">新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:icon:edit']">修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:icon:remove']">删除
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="iconList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="图标id" align="center" prop="iconId"/>
      <el-table-column label="地址" align="center" prop="remoteUrl"/>
      <el-table-column label="图片地址" align="center" width="150">
        <template slot-scope="scope">
          <el-image style="height: 80px;border-radius: 10px;" lazy :src="scope.row.remoteUrl"
                    :fit="contain"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:icon:edit']">修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:icon:remove']">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"/>

    <!-- 添加或修改对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="图片" prop="remoteUrl">
          <el-tooltip placement="top">
            <div slot="content">点击上传</div>
            <el-upload style="text-align: center; padding: 10px;border-radius: 10px;"
                       class="img-uploader" name="file" :headers="headers" :action="uploadUrl"
                       :show-file-list="false"
                       :on-success="handleUploadSuccess">
              <img v-if="form.remoteUrl" :src="form.remoteUrl" class="img"/>
              <i v-else class="el-icon-plus img-uploader-icon"></i></el-upload>
          </el-tooltip>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {listIcon, getIcon, delIcon, addIcon, updateIcon} from "@/api/app/lessonIcon";
import {getToken} from "@/utils/auth";

export default {
  name: "lessonIcon",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: false,
      // 总条数
      total: 0,
      // 表格数据
      iconList: [],
      // 弹出层标题
      title: "",
      contain: "contain",
      uploadUrl: process.env.VUE_APP_BASE_API + "/app/lessonIcon/uploadIcon",
      headers: {
        Authorization: "Bearer " + getToken()
      },
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询列表 */
    getList() {
      this.loading = true;
      listIcon(this.queryParams).then(response => {
        this.iconList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        iconId: null,
        remoteUrl: null,
        createTime: null,
        updateTime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.iconId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    // 上传图片
    handleUploadSuccess(res, file) {
      if (res.code === 200) {
        this.form.remoteUrl = res.url;
      } else {
        this.$message.error("图片上传失败");
      }
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加图标";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const iconId = row.iconId || this.ids
      getIcon(iconId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改图标";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.iconId != null) {
            updateIcon(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addIcon(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const iconIds = row.iconId || this.ids;
      this.$modal.confirm('是否确认删除图标编号为"' + iconIds + '"的数据项？').then(function () {
        return delIcon(iconIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {
      });
    },
  }
};
</script>
