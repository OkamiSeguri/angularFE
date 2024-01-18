import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/admin/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
  {
    name: 'Content',
    url: '/admin/content',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Category',
        url: '/admin/content/categories',
      },
      {
        name: 'BlogPost',
        url: '/admin/content/blogposts',
      },
      
    ],
  },

  {
    name: 'System',
    url: '/admin/system',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'Roles',
        url: 'admin/system/roles',
       
      },
      {
        name: 'Users',
        url: 'admin/system/users',
       
      }
    ],
  },
];