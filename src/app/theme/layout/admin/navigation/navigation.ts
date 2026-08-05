export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  role?: string[];
  isMainParent?: boolean;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: '/default',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'page',
    title: 'Pages',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'Authentication',
        title: 'Authentication',
        type: 'collapse',
        icon: 'ti ti-key',
        children: [
          {
            id: 'login',
            title: 'Login',
            type: 'item',
            url: '/login',
            target: true,
            breadcrumbs: false
          }/*,
          {
            id: 'register',
            title: 'Register',
            type: 'item',
            url: '/register',
            target: true,
            breadcrumbs: false
          }*/
        ]
      }
    ]
  },

  {
  id: 'interventions',
  title: 'Gestion des interventions',
  type: 'group',
  icon: 'ti ti-clipboard-check',

  children: [

    {
      id: 'intervention-list',
      title: 'Interventions',
      type: 'item',
      url: '/interventions',
      icon: 'ti ti-tool'
    }

  ]
},
  {
  id: 'management',
  title: 'Gestion Commerciale',
  type: 'group',
  icon: 'icon-navigation',
  children: [

    {
      id: 'contrats',
      title: 'Contrats',
      type: 'item',
      url: '/contrats',
      icon: 'ti ti-file-text'
    },
    {
 id:'prestations',
 title:'Prestations',
 type:'item',
 url:'/prestations',
 icon:'ti ti-settings'
}

  ]
},

  {
    id: 'manegment',
    title: 'Gestion',
    type: 'group',
    icon: 'icon-navigation',
    children: [

      {
  id: 'clients',
  title: 'Clients',
  type: 'item',
  url: '/clients',
  icon: 'ti ti-users'
},
{
  id: 'techniciens',
  title: 'Techniciens',
  type: 'item',
  url: '/techniciens',
  icon: 'ti ti-user-cog'
} 

    ]
  },

{
  id: 'sites',
  title: 'Gestion des sites',
  type: 'group',
  icon: 'ti ti-map-pin',

  children: [

    {
      id: 'site-list',
      title: 'Sites',
      type: 'item',
      url: '/sites',
      icon: 'ti ti-building'
    }

  ]
},
   {
  id: 'stock',
  title: 'Gestion des équipements',
  type: 'group',
  icon: 'ti ti-package',
  children: [
    {
      id: 'equipements',
      title: 'Équipements',
      type: 'item',
      url: '/equipements',
      icon: 'ti ti-tool'
    },
     {
      id: 'mouvements',
      title: 'Historique mouvements',
      type: 'item',
      url: '/mouvements-equipements',
      icon: 'ti ti-history'
    }
  ]
},
{
  id: 'facturation',
  title: 'Facturation',
  type: 'group',
  icon: 'icon-navigation',
  children: [

    {
      id: 'moulinettes',
      title: 'Moulinettes',
      type: 'item',
      url: '/moulinettes',
      icon: 'ti ti-file-invoice'
    },
    {
      id: 'factures',
      title: 'Factures',
      type: 'item',
      url: '/factures',
      icon: 'ti ti-file-invoice'
    }

  ]
}/*,
  {
    id: 'elements',
    title: 'Elements',
    type: 'group',
    icon: 'icon-navigation',
    children: [

      {
        id: 'typography',
        title: 'Typography',
        type: 'item',
        classes: 'nav-item',
        url: '/typography',
        icon: 'ti ti-typography'
      },
      {
        id: 'color',
        title: 'Colors',
        type: 'item',
        classes: 'nav-item',
        url: '/color',
        icon: 'ti ti-brush'
      },
      {
        id: 'tabler',
        title: 'Tabler',
        type: 'item',
        classes: 'nav-item',
        url: 'https://tabler-icons.io/',
        icon: 'ti ti-plant-2',
        target: true,
        external: true
      }
    ]
  },
  {
    id: 'other',
    title: 'Other',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'ti ti-brand-chrome'
      },
      {
        id: 'document',
        title: 'Documentation',
        type: 'item',
        classes: 'nav-item',
        url: 'https://codedthemes.gitbook.io/berry-angular/',
        icon: 'ti ti-vocabulary',
        target: true,
        external: true
      }
    ]
  }*/
];
