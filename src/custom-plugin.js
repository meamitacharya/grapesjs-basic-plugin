function dynamicBlog(editor) {
  // Define a new custom component
  editor.Components.addType('custom-blog', {
    model: {
      defaults: {
        // Make the editor understand when to bind `my-blog-type`
        isComponent: (el) => el.tagName === 'div',
        tagName: 'div',
        // Can be a string
        components: [
          {
            tagName: 'h1',
            type: 'text',
            content: 'Headers test',
            removable: false, // Can't remove it
            draggable: false, // Can't move it
            copyable: false,
            traits: [
              {
                type: 'checkbox',
                name: 'show__title',
                label: 'Show Title',
                changeProp: 1,
              },
              {
                type: 'button',
                text: 'Submit',
                full: true, // Full width button
                command: (editor) => {
                  const component = editor.getSelected();
                  const trait = component.getTrait('show__title');
                  const { value } = trait.props();
                  if (!value) {
                    const components = editor.getComponents();
                    components.forEach((component) => {
                      component.find('h1')[0].remove();
                    });
                  }
                },
              },
            ],
            show__title: 'checked',
          },
          '<p>Paragraph test</p>',
        ],
        style: {
          padding: '20px',
        },
      },
    },
  });

  editor.Blocks.add('custom-blog', {
    label: 'Custom Blog',
    media:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"/><path d="M4 10h1v4H4z"/></svg>',
    attributes: { class: 'fa fa-text' },
    content: { type: 'custom-blog' },
  });
}
function addNavBar(editor) {
  editor.Components.addType('navbar', {
    model: {
      defaults: {
        isComponent: (el) => el.tagName === 'DIV',
        tagName: 'ul',
        attributes: { class: 'navbar-div' },
        droppable: false,
        traits: [
          {
            type: 'text',
            label: 'Add Menu',
            name: 'add_menu',
          },
          {
            type: 'text',
            label: 'Menu Link',
            name: 'menu_link',
          },
          {
            type: 'button',
            text: 'Add Menu',
            full: true, // Full width button
            command: (editor) => {
              const component = editor.getSelected();
              // component.setStyle({ padding: '20px' });
              // console.log(component);
              const add_menu_trait = component.getTrait('add_menu');
              // console.log(add_menu_trait.props());
              const menu_link_trait = component.getTrait('menu_link');
              const add_menu_value = add_menu_trait.props().value;
              const menu_link_value = menu_link_trait.props().value;
              if (add_menu_value && menu_link_value) {
                component.append(
                  `<li><a href=${menu_link_value}>${add_menu_value}</a></li>`
                );
              }
            },
          },
          {
            type: 'button',
            text: 'Show Menus',
            full: true,
            command: (editor) => {
              const component = editor.getSelected();
              component.setStyle({ padding: '20px' });
            },
          },
          {
            type: 'button',
            text: 'Hide Menus',
            full: true,
            command: (editor) => {
              const component = editor.getSelected();
              component.setStyle({
                display: 'none',
                // padding: '20px',
              });
            },
          },
          // {
          //   type: 'button',
          //   text: 'Delete Menus',
          //   full: true,
          //   command: (editor) => {
          //     const component = editor.getSelected();
          //     console.log(component);
          //   },
          // },
        ],
        // Static content
        components: `<li><a href='#home'>Home</a></li><li><a href='#contact'>Contact</a></li>`,
        style: {
          padding: '20px',
        },
      },
    },
  });
  //Block for adding Navbar
  editor.Blocks.add('navbar', {
    label: 'Navbar',
    media:
      '<svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z" fill-rule="nonzero"></path><rect class="gjs-block-svg-path" x="15" y="10" width="5" height="1"></rect><rect class="gjs-block-svg-path" x="15" y="13" width="5" height="1"></rect><rect class="gjs-block-svg-path" x="15" y="11.5" width="5" height="1"></rect></svg>',

    content: { type: 'navbar' }, // Navbar Component
  });
}
