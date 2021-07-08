const actions = {
  checkLocalStorage: function () {
    const memosDiv = document.querySelector('.memos');
    memosDiv.innerHTML = '';
    const currentMemos = this.getMemos();
    if (!currentMemos || currentMemos.length === 0) {
      this.buildEmpty();
    } else {
      this.buildMemos();
    }
  },
  buildEmpty: function () {
    const memosDiv = document.querySelector('.memos');
    memosDiv.textContent = 'IsEmpty!!';
  },
  buildMemos: function () {
    const memos = this.getMemos();
    memos.forEach(memo => this.buildMemo(memo));
  },
  buildMemo: function (memo) {
    const memosDiv = document.querySelector('.memos');
    const memoDiv = document.createElement('div');
    memoDiv.classList.add('memo');
    const contentSpan = document.createElement('span');
    contentSpan.classList.add('content');
    contentSpan.textContent = memo.content;
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('deleteBtn', 'hidden');
    deleteBtn.dataset.id = memo.id;
    deleteBtn.textContent = '❌';
    events.deleteMemo(deleteBtn);
    memoDiv.appendChild(contentSpan);
    memoDiv.appendChild(deleteBtn);
    memosDiv.appendChild(memoDiv);
  },
  getMemos: function () {
    return JSON.parse(localStorage.getItem('memos'));
  },
  saveMemos: function (newMemos) {
    localStorage.setItem('memos', JSON.stringify(newMemos));
  },
  addMemo: function () {
    const addInput = document.querySelector('.addInput');
    const addBtn = document.querySelector('.addBtn');
    const rawContent = addInput.value;
    const cleanedContent = rawContent.trim();
    if (cleanedContent) {
      const newMemo = { id: Date.now(), content: cleanedContent };
      const oldMemos = actions.getMemos() || [];
      const newMemos = [newMemo, ...oldMemos];
      actions.saveMemos(newMemos);
      addInput.value = '';
      actions.checkLocalStorage();
      addBtn.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.5)' }, { transform: 'scale(1)' }], { duration: 1000 });
    }
  },
  deleteMemo: function () {
    const oldMemos = actions.getMemos();
    const newMemos = oldMemos.filter(memo => memo.id !== Number(this.dataset.id));
    actions.saveMemos(newMemos);
    actions.checkLocalStorage();
  },
};

const events = {
  addMemo: function () {
    window.addEventListener(
      'keypress',
      e => e.keyCode === 13 && document.activeElement.classList.contains('addInput') && actions.addMemo()
    );
    document.querySelector('.addBtn').addEventListener('click', actions.addMemo);
  },
  deleteMemo: function (deleteBtn) {
    deleteBtn.addEventListener('click', actions.deleteMemo);
  },
};

export { actions, events };
