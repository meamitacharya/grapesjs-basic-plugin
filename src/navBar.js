function navBar(editor) {
  const domc = editor.Components;
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  const navbarPfx = 'navbar';
  const labelNavbar = 'Navbar';
  const navbarRef = 'navbar';
  const labelNavbarContainer = 'Navbar Container';
  const labelBurgerLine = 'Burger Line';
  const navbarItemsRef = 'navbar-items';
  const menuRef = 'navbar-menu';
  const labelMenu = ' Navbar Menu';
  const labelMenuLink = 'Menu Link';

  const getAllMenus = function () {
    const menuNames = ['Home', 'About', 'Contact'];
    const menuLinks = ['#home', '#about', '#contact'];
    const labelMenuLink = 'Menu Link';
    const menuRef = 'navbar-menu';
    const navbarPfx = 'navbar';
    const navList = this.querySelector('[data-gjs=navbar-menu]');
    Array.from(menuNames).map((item, index) => {
      const menuLink = menuLinks[index];
      const menuName = menuNames[index];
      // console.log(menuLink, menuName);
      navList.insertAdjacentHTML(
        'beforeend',
        `<a href=${menuLink} class="${navbarPfx}-menu-link menu${index}"  data-gjs-draggable="[data-gjs=${menuRef}]">${menuName}</a>`
      );
    });
  };

  const addMenu = function () {
    const component = editor.getSelected();
    const add_menu_trait = component.getTrait('add_menu');
    const menu_link_trait = component.getTrait('menu_link');
    const add_menu_value = add_menu_trait.props().value;
    const menu_link_value = menu_link_trait.props().value;
    // console.log(add_menu_value, menu_link_value);

    if (add_menu_value && menu_link_value) {
      const navList = this.querySelector('[data-gjs=navbar-menu]');
      //   let menuItem = setMenu(add_menu_value, menu_link_value);
      navList.insertAdjacentHTML(
        'beforeend',
        ` <a href=${menu_link_value} class="navbar-menu-link"  data-gjs-draggable="[data-gjs=${menuRef}]">${add_menu_value}</a>`
      );
    }
  };

  editor.TraitManager.addType('new-div', {
    createLabel({ label }) {
      return `<div>
          <div>Before</div>
          ${label}
          <div>After</div>
        </div>`;
    },
  });

  domc.addType('navBar', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        isComponent: (el) => el.tagName === 'DIV',
        tagName: 'div',
        'custom-name': 'Navbar',
        attributes: { class: 'navbar' },
        droppable: false,
        traits: [
          {
            type: 'new-div',
            label: 'new Div',
          },

          //   {
          //     type: 'text',
          //     label: 'Add Menu',
          //     name: 'add_menu',
          //   },
          //   {
          //     type: 'text',
          //     label: 'Menu Link',
          //     name: 'menu_link',
          //   },
          //   {
          //     type: 'button',
          //     text: 'Add Menu',
          //     full: true, // Full width button
          //     command: (editor) => {
          //       const component = editor.getSelected();
          //       // console.log(component);
          //       const add_menu_trait = component.getTrait('add_menu');
          //       const menu_link_trait = component.getTrait('menu_link');
          //       const add_menu_value = add_menu_trait.props().value;
          //       const menu_link_value = menu_link_trait.props().value;
          //       const nav = component.find('.navbar-menu')[0];
          //       // console.log(nav.getEl().children.length);
          //       // console.log(nav.getEl());
          //       let index = nav.getEl().children.length;
          //       if (add_menu_value && menu_link_value) {
          //         nav.getEl().insertAdjacentHTML(
          //           'beforeend',
          //           `
          //           <a href=${menu_link_value} class="navbar-menu-link menu${index}"  data-gjs-draggable="[data-gjs=${menuRef}]">${add_menu_value}</a>
          //           `
          //         );
          //         //Adding recently added menu into trait select options object
          //         const menuTrait = component.getTrait('menuType');
          //         const optionsList = menuTrait.props().options;
          //         optionsList.push({
          //           id: `menu${index}`,
          //           name: `${add_menu_value}`,
          //         });
          //         //Replacing old menu lists with updated one
          //         console.log(optionsList);
          //         // options = optionsList;
          //         menuTrait.set({ options: optionsList });
          //         console.log(component.getTrait('menuType').props().options);
          //       }
          //       // console.log(options);
          //       // console.log(optionsList);
          //     },
          //   },

          //   {
          //     type: 'select',
          //     label: 'Select Menu',
          //     name: 'menuType',
          //     options: [
          //       { id: 'menu0', name: 'Home' },
          //       { id: 'menu1', name: 'About' },
          //       { id: 'menu2', name: 'Contact' },
          //       // { id: 'menu3', name: 'Feature' },
          //     ],
          //   },
          //   {
          //     type: 'button',
          //     text: 'Delete Menu',
          //     full: true,
          //     command: (editor) => {
          //       const component = editor.getSelected();
          //       // console.log(component);
          //       const menuTrait = component.getTrait('menuType');
          //       // console.log(menuTrait.props().options);
          //       let { value: menuTraitValue } = menuTrait.props();
          //       menuTraitValue = menuTraitValue == '' ? 'menu0' : menuTraitValue;
          //       // console.log('Menu trail value', menuTraitValue);
          //       const index = menuTraitValue.match(/(\d+)/);
          //       // console.log(index[0]);
          //       // console.log(
          //       //   'Menu items length',
          //       //   component.find('.navbar-menu')[0].getEl().children.length
          //       // );
          //       const foundMenuNode = component.find('.navbar-menu')[0].getEl()
          //         .children[index[0]];
          //       // console.log(foundMenuNode);
          //       foundMenuNode.remove();
          //       // console.log(
          //       //   'Remaing children',
          //       //   component.find('.navbar-menu')[0].getEl().children.length
          //       // );
          //       // console.log('-------------------');
          //       // console.log(foundMenuNode.remove());

          //       // for (let i = 0; i < menuTrait.props().options.length; i++) {
          //       //   const index = menuTraitValue.match(/(\d+)/);
          //       //   console.log(index);
          //       // }

          //       // const nav = component.find('.navbar-menu')[0];
          //       // const menuItems = component.find('.navbar-menu')[0].getEl()
          //       //   .children;
          //       // console.log(menuItems[0]);
          //       // Array.from(menuItems).map((item, index) => {
          //       //   // nav.removeChild(nav.childNodes[index]);
          //       //   nav.getEl().removeChild(item[index]);
          //       //   console.log(item, index);
          //       // });
          //     },
          //   },
        ],
        script: getAllMenus,
      },
    }),

    view: defaultView.extend({
      init() {
        const comps = this.model.get('components');

        if (!comps.length) {
          comps.reset();
          comps.add(
            `
            <div class="${navbarPfx}-container" data-gjs-droppable="false" data-gjs-draggable="false"
              data-gjs-removable="false" data-gjs-copyable="false" data-gjs-highlightable="false" data-gjs-custom-name="${labelNavbarContainer}">
  
              <a href="/" class="${navbarPfx}-brand" data-gjs-droppable="true">Logo</a>
  
              <div class="${navbarPfx}-burger" >
                <div class="${navbarPfx}-burger-line" data-gjs-custom-name="${labelBurgerLine}" data-gjs-droppable="false" data-gjs-draggable="false"></div>
                <div class="${navbarPfx}-burger-line" data-gjs-custom-name="${labelBurgerLine}" data-gjs-droppable="false" data-gjs-draggable="false"></div>
                <div class="${navbarPfx}-burger-line" data-gjs-custom-name="${labelBurgerLine}" data-gjs-droppable="false" data-gjs-draggable="false"></div>
              </div>
  
              <div class="${navbarPfx}-items-c" data-gjs="${navbarItemsRef}">
                <nav class="${navbarPfx}-menu" data-gjs="${menuRef}" data-gjs-custom-name="${labelMenu}">
                  
                </nav>
              </div>
  
            </div>
         
                `
          );
        }
      },
    }),
  });

  editor.Blocks.add('navBar', {
    label: 'Nav Bar *',
    media:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"/><path d="M4 10h1v4H4z"/></svg>',
    attributes: { class: 'fa fa-text' },
    content: { type: 'navBar' },
  });
}
