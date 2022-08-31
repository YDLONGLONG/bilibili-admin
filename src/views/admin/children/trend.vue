<template>
  <div id="video">
    <main>
      <div class="table">
        <el-table :data="trendsFilter" style="width: 100%">
          <el-table-column sortable prop="_id" label="_id"></el-table-column>
          <el-table-column sortable prop="author" label="作者"></el-table-column>
          <el-table-column sortable prop="content" label="内容"></el-table-column>
          <el-table-column label="上传时间">
            <template slot-scope="scope">
              {{scope.row.date|fullDateFormat}}
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="keyWords"
                placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope">
              <el-button @click="editTrend( scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" @click="deleteTrend(scope.$index, scope.row._id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--        分页-->
        <el-pagination
          style="text-align: center;margin: 8px 0"
          background
          :current-page="page"
          layout="prev, pager, next,total"
          :total="count"
          :page-size="pageSize"
          @current-change="handleCurrent"
          hide-on-single-page
        ></el-pagination>
      </div>
      <div>
        <el-dialog title="编辑" :visible.sync="dialogFormVisible">
          <el-form :model="newTrend" label-width="80px">
            <el-form-item label="内容">
              <el-input v-model="newTrend.content" autocomplete="off" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="时间">
              <div class="block">
                <el-date-picker
                  v-model="newTrend.date"
                  type="datetime"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </main>
  </div>
</template>
<script>
  import {getAll, deleteTrend, editTrend} from '../../../api/trend'
  export default {
    name: 'User',
    computed: {
      trendsFilter () {
        let result = this.trends.filter(data => ( !this.keyWords || data.content.toLowerCase().includes(this.keyWords.toLowerCase())))
        this.count = result.length
        return result.slice((this.page - 1) * this.pageSize, this.pageSize * this.page)
      }
    },
    data () {
      return {
        page: 1,
        count: 0,
        pageSize: 6,
        keyWords: '',
        trends: [],
        dialogFormVisible: false,
        newTrend: {}
      }
    },
    methods: {
      async submit () {
        let date = this.newTrend.date
        this.newTrend.date = date.getTime ? date.getTime() : date
        let result = await editTrend(this.newTrend)
        this.trends = result.data
        this.dialogFormVisible = false
      },
      editTrend (index, trend) {
        this.dialogFormVisible = true
        this.newTrend = trend
      },
      deleteTrend (index, _id) {
        this.$confirm('是否删除?', {type: 'warning'}).then(async () => {
          let result = await deleteTrend(_id)
          this.trends = result.data
        })
      },
      handleCurrent (index) {
        this.page = index
      },
      async init () {
        let result = await getAll()
        this.trends = result.data
      }
    },
    created () {
      this.init()
    }
  }
</script>
<style lang="scss" scoped>
  #video {
    main {
      margin: 2rem;
      border-radius: 4px;
      background-color: white;
      padding: 1rem;
    }
  }
</style>
