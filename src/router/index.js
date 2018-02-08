import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/Index'
import Supply from '@/view/S'
import Logistics from '@/view/L'
import Root from '@/view/R'

import S1 from '@/view/supply/S1'
import S2 from '@/view/supply/S2'
import S3 from '@/view/supply/S3'
import S4 from '@/view/supply/S4'
import S5 from '@/view/supply/S5'

import L1 from '@/view/logistics/L1'
import L2 from '@/view/logistics/L2'
import L3 from '@/view/logistics/L3'
import L4 from '@/view/logistics/L4'
import L5 from '@/view/logistics/L5'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        {
          path: '',
          name: 'root',
          component: Root
        },
        {
          path: 's',
          name: 'supply',
          component: Supply,
          children: [
            {
              path: '/',
              name: 's1',
              component: S1
            },
            {
              path: 's2',
              name: 's2',
              component: S2
            },
            {
              path: 's3',
              name: 's3',
              component: S3
            },
            {
              path: 's4',
              name: 's4',
              component: S4
            },
            {
              path: 's5',
              name: 's5',
              component: S5
            }
          ]
        },
        {
          path: 'l',
          name: 'logistics',
          component: Logistics,
          children: [
            {
              path: '',
              name: 'l1',
              component: L1
            },
            {
              path: 'l2',
              name: 'l2',
              component: L2
            },
            {
              path: 'l3',
              name: 'l3',
              component: L3
            },
            {
              path: 'l4',
              name: 'l4',
              component: L4
            },
            {
              path: 'l5',
              name: 'l5',
              component: L5
            }
          ]
        }
      ]
    }

  ]
})
