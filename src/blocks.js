export default (editor, opts = {}) => {
  const bm = editor.BlockManager;

  bm.add('MY-BLOCK', {
    label: 'My block',
    content: { type: 'MY-COMPONENT' },
    // media: '<svg>...</svg>',
  });
  bm.add('the-row-block', {
    label: `<div>
          <img src="https://picsum.photos/70/70"/>
          <div class="my-label-block">Label block</div>
        </div>`,
    content:
      '<div class="row" data-gjs-droppable="true" >' +
      '<div class="row-cell" data-gjs-draggable="true"></div>' +
      '<div class="row-cell" data-gjs-draggable="true"></div>' +
      '</div>',
    render: ({ model }) =>
      ` <div class="my-wrap">
          ${model.get('label')}
        </div>`,
  });
};
