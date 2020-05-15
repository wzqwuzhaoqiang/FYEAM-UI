import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '',
    name: 'doc',
    meta: {
      title: '文档',
      href: 'https://lison16.github.io/iview-admin-doc/#/',
      icon: 'ios-book'
    }
  },
  {
    path: '/aseet-pd',
    name: 'asset_pd',
    component: Main,
    meta: {
      icon: 'logo-buffer',
      title: '资产盘点'
    },
    component: Main,
    children: [
      {
        path: 'asset_pd_bat',
        name: 'asset_pd_bat',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '资产盘点批次'
        },
        component: () => import('@/view/aseet-pd/tables.vue')
      },
      // {
      //   path: 'asset_pd_exception',
      //   name: 'asset_pd_exception',
      //   meta: {
      //     icon: 'md-list',
      //     title: '盘点异常表'
      //   },
      //   component: () => import('@/view/error-page/404.vue')
      // },
      {
        path: 'asset_pd_list',
        name: 'asset_pd_list',
        meta: {
          icon: '_bear',
          title: '盘点列表'
        },
        component: () => import('@/view/aseet-pd/check-list.vue')
      },
      {
        path: 'asset_pd_bat_list',
        name: 'asset_pd_bat_list',
        meta: {
          icon: '_bear',
          title: '盘点批次列表',
          notCache: true,
          hideInMenu: true,
        },
        component: () => import('@/view/aseet-pd/check-bat_list.vue')
      },

      {
        path: 'asset-Batch',
        name: 'asset_Batch',
        meta: {
          icon: 'md-flower',
          title: '新增盘点批次',
          notCache: true,
          hideInMenu: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/aseet-pd/batch-add-page.vue')
      }
    ]
  },
  {
    path: '/asset',
    name: 'asset',
    component: Main,
    meta: {
      icon: 'logo-buffer',
      title: '资产'
    },
    component: Main,
    children: [
      {
        path: 'eqp_asset',
        name: 'eqp_asset',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '设备资产'
        },
        component: () => import('@/view/error-page/404.vue')
      },
      {
        path: 'cmp_asset',
        name: 'cmp_asset',
        meta: {
          icon: 'md-list',
          title: '计算机资产'
        },
        component: () => import('@/view/asset/tables')
      },
      {
        path: 'cmp_soft_asset',
        name: 'cmp_soft_asset',
        meta: {
          icon: 'md-list',
          title: '软件资产'
        },
        component: () => import('@/view/asset/softwareTable')
      },
      {
        path: 'trans_asset',
        name: 'trans_asset',
        meta: {
          icon: 'md-list',
          title: '资产转移单'
        },
        component: () => import('@/view/asset/AssetTransferTable')
      },
      {
        path: 'add_asset_Transfer',
        name: 'add_asset_Transfer',
        meta: {
          icon: 'md-flower',
          title: '新增资产转移单',
          notCache: true,
          hideInMenu: true,
        },
        component: () => import('@/view/asset/transfer-add-page.vue')
      },
      {
        path: 'asset_update',
        name: 'asset_update',
        meta: {
          icon: '_bear',
          title: '资产修改',
          notCache: true,
          hideInMenu: true,
        },
        component: () => import('@/view/asset/asset_update.vue')
      },
      {
        path: 'asset_add',
        name: 'asset_add',
        meta: {
          icon: '_bear',
          title: '新增资产',
          notCache: true,
          hideInMenu: true,
        },
        component: () => import('@/view/asset/asset_add.vue')
      },
    ]
  },

  {
    path: '/work-order',
    name: 'work_order',
    component: Main,
    meta: {
      icon: 'logo-buffer',
      title: '检修单'
    },
    component: Main,
    children: [
      {
        path: 'eqp_work_order',
        name: 'eqp_work_order',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '设备资产检修列表'
        },
        component: () => import('@/view/work-order/tables.vue')
      },
      {
        path: 'cmp_work_order',
        name: 'cmp_work_order',
        meta: {
          icon: 'md-list',
          title: '计算机资产检修列表'
        },
        component: () => import('@/view/work-order/tables.vue')
      },
      {
        path: 'repair_work_order',
        name: 'repair_work_order',
        meta: {
          icon: 'md-list',
          title: '资产维修履历'
        },
        component: () => import('@/view/asset/repairRecord.vue')
      }
    ]
  },
  {
    path: '/borrow',
    name: 'borrow',
    component: Main,
    meta: {
      icon: 'logo-buffer',
      title: '借用单'
    },
    component: Main,
    children: [
      {
        path: 'borrow_list',
        name: 'borrow_list',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '借用记录表单'
        },
        component: () => import('@/view/asset/borrowRecord.vue')
      },
      {
        path: 'form_test',
        name: 'form_test',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '测试表单'
        },
        component: () => import('@/view/error-page/404.vue')
      },
    ]
  },
  {
    path: '/report',
    name: 'report',
    component: Main,
    meta: {
      icon: 'logo-buffer',
      title: '报表'
    },
    component: Main,
    children: [
      {
        path: 'eqp_work_order_report',
        name: 'eqp_work_order_report',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '设备资产检修报表'
        },
        component: () => import('@/view/error-page/404.vue')
      },
      {
        path: 'cmp_work_order_report',
        name: 'cmp_work_order_report',
        meta: {
          icon: 'md-list',
          title: '计算机资产检修报表'
        },
        component: () => import('@/view/error-page/404.vue')
      }
    ]
  },
  {
    path: '/logger',
    name: 'logger',
    component: Main,
    meta: {
      icon: 'logo-buffer',
      title: '日志'

    },},
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/view/single-page/message/index.vue')
      }
    ]
  },
  {
    path: '/components',
    name: 'components',
    meta: {
      icon: 'logo-buffer',
      title: '组件',
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'tree_select_page',
        name: 'tree_select_page',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '树状下拉选择器'
        },
        component: () => import('@/view/components/tree-select/index.vue')
      },
      {
        path: 'count_to_page',
        name: 'count_to_page',
        meta: {
          icon: 'md-trending-up',
          title: '数字渐变'
        },
        component: () => import('@/view/components/count-to/count-to.vue')
      },
      {
        path: 'drag_list_page',
        name: 'drag_list_page',
        meta: {
          icon: 'ios-infinite',
          title: '拖拽列表'
        },
        component: () => import('@/view/components/drag-list/drag-list.vue')
      },
      {
        path: 'drag_drawer_page',
        name: 'drag_drawer_page',
        meta: {
          icon: 'md-list',
          title: '可拖拽抽屉'
        },
        component: () => import('@/view/components/drag-drawer')
      },
      {
        path: 'org_tree_page',
        name: 'org_tree_page',
        meta: {
          icon: 'ios-people',
          title: '组织结构树'
        },
        component: () => import('@/view/components/org-tree')
      },
      {
        path: 'tree_table_page',
        name: 'tree_table_page',
        meta: {
          icon: 'md-git-branch',
          title: '树状表格'
        },
        component: () => import('@/view/components/tree-table/index.vue')
      },
      {
        path: 'cropper_page',
        name: 'cropper_page',
        meta: {
          icon: 'md-crop',
          title: '图片裁剪'
        },
        component: () => import('@/view/components/cropper/cropper.vue')
      },
      {
        path: 'tables_page',
        name: 'tables_page',
        meta: {
          icon: 'md-grid',
          title: '多功能表格'
        },
        component: () => import('@/view/components/tables/tables.vue')
      },
      {
        path: 'split_pane_page',
        name: 'split_pane_page',
        meta: {
          icon: 'md-pause',
          title: '分割窗口'
        },
        component: () => import('@/view/components/split-pane/split-pane.vue')
      },
      {
        path: 'markdown_page',
        name: 'markdown_page',
        meta: {
          icon: 'logo-markdown',
          title: 'Markdown编辑器'
        },
        component: () => import('@/view/components/markdown/markdown.vue')
      },
      {
        path: 'editor_page',
        name: 'editor_page',
        meta: {
          icon: 'ios-create',
          title: '富文本编辑器'
        },
        component: () => import('@/view/components/editor/editor.vue')
      },
      {
        path: 'icons_page',
        name: 'icons_page',
        meta: {
          icon: '_bear',
          title: '自定义图标'
        },
        component: () => import('@/view/components/icons/icons.vue')
      }
    ]
  },
  {
    path: '/update',
    name: 'update',
    meta: {
      icon: 'md-cloud-upload',
      title: '数据上传',
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'update_table_page',
        name: 'update_table_page',
        meta: {
          icon: 'ios-document',
          title: '上传Csv'
        },
        component: () => import('@/view/update/update-table.vue')
      },
      {
        path: 'update_paste_page',
        name: 'update_paste_page',
        meta: {
          icon: 'md-clipboard',
          title: '粘贴表格数据'
        },
        component: () => import('@/view/update/update-paste.vue')
      }
    ]
  },
  {
    path: '/excel',
    name: 'excel',
    meta: {
      icon: 'ios-stats',
      title: 'EXCEL导入导出',
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'upload-excel',
        name: 'upload-excel',
        meta: {
          icon: 'md-add',
          title: '导入EXCEL'
        },
        component: () => import('@/view/excel/upload-excel.vue')
      },
      {
        path: 'export-excel',
        name: 'export-excel',
        meta: {
          icon: 'md-download',
          title: '导出EXCEL'
        },
        component: () => import('@/view/excel/export-excel.vue')
      }
    ]
  },
  {
    path: '/tools_methods',
    name: 'tools_methods',
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'tools_methods_page',
        name: 'tools_methods_page',
        meta: {
          icon: 'ios-hammer',
          title: '工具方法',
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/tools-methods/tools-methods.vue')
      }
    ]
  },
  {
    path: '/i18n',
    name: 'i18n',
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'i18n_page',
        name: 'i18n_page',
        meta: {
          icon: 'md-planet',
          title: 'i18n - {{ i18n_page }}'
        },
        component: () => import('@/view/i18n/i18n-page.vue')
      }
    ]
  },
  {
    path: '/error_store',
    name: 'error_store',
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'error_store_page',
        name: 'error_store_page',
        meta: {
          icon: 'ios-bug',
          title: '错误收集'
        },
        component: () => import('@/view/error-store/error-store.vue')
      }
    ]
  },
  {
    path: '/error_logger',
    name: 'error_logger',
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'error_logger_page',
        name: 'error_logger_page',
        meta: {
          icon: 'ios-bug',
          title: '错误收集'
        },
        component: () => import('@/view/single-page/error-logger.vue')
      }
    ]
  },
  {
    path: '/directive',
    name: 'directive',
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'directive_page',
        name: 'directive_page',
        meta: {
          icon: 'ios-navigate',
          title: '指令'
        },
        component: () => import('@/view/directive/directive.vue')
      }
    ]
  },
  {
    path: '/multilevel',
    name: 'multilevel',
    meta: {
      icon: 'md-menu',
      title: '多级菜单',
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'level_2_1',
        name: 'level_2_1',
        meta: {
          icon: 'md-funnel',
          title: '二级-1'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
      {
        path: 'level_2_2',
        name: 'level_2_2',
        meta: {
          access: ['super_admin'],
          icon: 'md-funnel',
          showAlways: true,
          title: '二级-2'
        },
        component: parentView,
        children: [
          {
            path: 'level_2_2_1',
            name: 'level_2_2_1',
            meta: {
              icon: 'md-funnel',
              title: '三级'
            },
            component: () => import('@/view/multilevel/level-2-2/level-2-2-1.vue')
          },
          {
            path: 'level_2_2_2',
            name: 'level_2_2_2',
            meta: {
              icon: 'md-funnel',
              title: '三级'
            },
            component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
          }
        ]
      },
      {
        path: 'level_2_3',
        name: 'level_2_3',
        meta: {
          icon: 'md-funnel',
          title: '二级-3'
        },
        component: () => import('@/view/multilevel/level-2-3.vue')
      }
    ]
  },
  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: route => `{{ params }}-${route.params.id}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: route => `{{ query }}-${route.query.id}`,
          notCache: true
        },
        component: () => import('@/view/argu-page/query.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
