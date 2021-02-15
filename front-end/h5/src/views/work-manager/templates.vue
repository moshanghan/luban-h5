<script>
import { mapState, mapActions } from 'vuex'

import PreviewDialog from '@/components/core/editor/modals/preview.vue'
import ListItemCard from '@/components/common/work/card-item.js'

export default {
  components: {
    ListItemCard
  },
  data: () => ({
    activeWork: null,
    previewVisible: false,
    useTemplateDialogVisible: false,
    clonedWorkFromTemplate: null // 从某个模板复制出来的作品
  }),
  computed: {
    ...mapState('editor', ['works', 'workTemplates']),
    ...mapState('loading', ['fetchWorkTemplates_loading'])
  },
  methods: {
    ...mapActions('editor', [
      'fetchWorks',
      'fetchWorkTemplates',
      'useTemplate',
      'deleteWork'
    ]),
    handleDeleteWork (work) {
      this.deleteWork(work.id).then(res => {
        const index = this.workTemplates.findIndex(item => item.id === work.id)
        this.workTemplates.splice(index, 1)
      })
    }
  },
  render (h) {
    return (
      <div class="works-wrapper">
        <a-row gutter={12}>
          {
            this.fetchWorkTemplates_loading
              ? <a-col span={24} style="margin-bottom: 10px;text-align: center;height: 355px;line-height: 355px;border-bottom: 1px solid #ebedf0;background: rgba(255, 255, 255, 0.5);">
                <a-spin tip="作品列表获取中..."/>
              </a-col>
              : this.workTemplates.map(work => (
                <a-col span={6} key={work.id} style="margin-bottom: 20px;">
                  <ListItemCard
                    isTemplate={true}
                    work={work}
                    handleClickPreview={e => {
                      this.previewVisible = true
                      this.activeWork = work
                    }}
                    handleUseTemplate={templateWork => {
                      this.useTemplateDialogVisible = true
                      this.useTemplate(templateWork.id).then((clonedWork) => {
                        this.clonedWorkFromTemplate = clonedWork
                      })
                    }}
                    handleClickDelete={() => this.handleDeleteWork(work)}
                  />
                </a-col>
              ))
          }
        </a-row>
        {
          <PreviewDialog
            work={this.activeWork || {}}
            visible={this.previewVisible}
            handleClose={() => { this.previewVisible = false }}
          />
        }
        {
          this.useTemplateDialogVisible &&
          <a-modal
            visible={true}
            // onOk={() => { this.useTemplateDialogVisible = true }}
            // onCancel={() => { this.useTemplateDialogVisible = false }}
            width="240px"
            okText="保存"
            footer={null}
            closable={false}
            centered
          >
            <div style="text-align: center;">
              {
                this.clonedWorkFromTemplate
                  ? <div>
                    <div style={{ margin: '12px' }}><a-icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> 模板已保存至"我的作品"中</div>
                    <a-button onClick={() => {
                      this.useTemplateDialogVisible = false
                      this.clonedWorkFromTemplate = null
                    }}>我再逛逛</a-button>
                    <a-button type="primary"
                      onClick={() => {
                        const routeData = this.$router.resolve({ name: 'editor', params: { workId: this.clonedWorkFromTemplate.id } })
                        window.open(routeData.href, '_blank')
                      }}
                      style={{ marginLeft: '12px' }}
                    >立即查看</a-button>
                  </div>
                  : <a-spin tip="复制中" />
              }
            </div>
          </a-modal>
        }
      </div>
    )
  },
  created () {
    this.fetchWorkTemplates()
  }
}
</script>
