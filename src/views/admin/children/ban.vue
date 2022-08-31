<template>
  <div id="video">
    <main>
      <div class="table">
        <el-table :data="bansFilter" style="width: 100%">
          <el-table-column sortable prop="_id" label="_id"></el-table-column>
          <el-table-column sortable prop="trendid" label="文章id"></el-table-column>
          <el-table-column sortable prop="submitid" label="举报人id"></el-table-column>
          <el-table-column sortable prop="radio" label="举报类型"></el-table-column>
          <el-table-column sortable prop="textarea" label="举报说明"></el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="keyWords"
                placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope">
              <el-button @click="checkTrend( scope.$index, scope.row.trendid)">查看原文</el-button>
              <el-button type="danger" @click="deleteTrend(scope.$index, scope.row._id, scope.row.trendid)">删除原文</el-button>
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
              <el-input v-html="newTrend.content" autocomplete="off" type="textarea"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">关 闭</el-button>
          </div>
        </el-dialog>
      </div>
    </main>
  </div>
</template>
<script>
  import {getAll, trendById, deleteTrends} from '../../../api/ban'
  export default {
    name: 'User',
    computed: {
      bansFilter () {
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
        newTrend:{
            content:''
        }
      }
    },
    methods: {
      async checkTrend (index, trendid) {
        this.dialogFormVisible = true
        let result = await trendById({trendid:trendid})
        this.newTrend.content = result.data.content
      },
      deleteTrend (index, _id, trendid) {
        this.$confirm('是否删除?', {type: 'warning'}).then(async () => {
          let result = await deleteTrends({_id:_id,trendid:trendid})
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
