import { ref } from 'vue'

/**
 * 関数 `useTodoList` は、タスクを追加、表示、編集、削除、確認するメソッドを含む Todo リストを作成し、そのリストをローカル ストレージに保存します。
 * @returns `todoListRef` 参照と、todo リスト内のタスクを追加、表示、編集、削除、確認するための関数を含むオブジェクト。
 */
export const useTodoList = () => {
  const ls = localStorage.todoList
  const todoListRef = ref([])
  todoListRef.value = ls ? JSON.parse(ls) : []

  /**
   * この機能は、新しいタスクを ToDo リストに追加し、ローカル ストレージに保存します。
   * @param task - 「task」パラメータは、todo リストに追加する必要があるタスクを表す文字列です。これは、一意の `id` プロパティ (`new
   * Date().getTime()` メソッドを使用して生成) と、指定されたタスク文字列に設定された `task` プロパティを持つ新しいオブジェクトを作成するために使用されます。
   */
  const add = (task) => {
    const id = new Date().getTime()
    todoListRef.value.push({ id: id, task: task })
    localStorage.todoList = JSON.stringify(todoListRef.value)
  }

  /**
   * 関数 `findById` は、一致する ID を持つ todo リストから todo オブジェクトを返します。
   * @param id - `id` パラメータは、`todoListRef` 配列内の特定の todo 項目を検索するために使用される一意の識別子です。 `findById` 関数は、この `id`
   * パラメータを受け取り、指定された `id` に一致する todo アイテムを返します。
   * @returns `findById` 関数は、関数に渡された `id` パラメータに一致する `id` プロパティを持つ `todoListRef` 配列からオブジェクトを返します。
   */
  const findById = (id) => {
    return todoListRef.value.find((todo) => todo.id === id)
  }

  /**
   * この関数は、その id プロパティに基づいて配列内のオブジェクトのインデックスを検索します。
   * @param id - `id` パラメータは、`todoListRef` 配列内の特定の todo 項目のインデックスを見つけるために使用される一意の識別子です。関数 `findIndexById`
   * は、この `id` パラメータを受け取り、一致する `id` を持つ配列内の todo アイテムのインデックスを返します。
   * @returns `findIndexById` 関数は、関数に渡された `id` 引数と等しい `id` プロパティを持つ `todoListRef`
   * 配列内の最初の要素のインデックスを返します。そのような要素が見つからない場合は、-1 を返します。
   */
  const findIndexById = (id) => {
    return todoListRef.value.findIndex((todo) => todo.id === id)
  }

  /* `const editId = ref(-1)` は、初期値 `-1` を持つ `editId` という変数へのリアクティブ参照を作成します。この参照を Vue.js
テンプレートおよびコンポーネントで使用して、編集中の Todo アイテムの ID を追跡できます。 `editId.value` プロパティを使用して更新できます。 */
  const editId = ref(-1)

  /**
   * 関数「show」は、指定された ID に関連付けられたタスクを返し、「editId」の値をその ID に設定します。
   * @param id - `id` パラメータは、データ ソースから対応する todo オブジェクトを検索して取得するために使用される todo 項目の一意の識別子です。
   * @returns `show` 関数は、指定された `id` に一致する `todo` オブジェクトの `task` プロパティを返します。
   */
  const show = (id) => {
    const todo = findById(id)
    editId.value = id
    return todo.task
  }

  /**
   * この機能は、ToDo リスト内のタスクを編集し、ローカル ストレージ内のタスクを更新します。
   * @param task - 「task」パラメータは、ユーザーが編集したい更新されたタスクを表す文字列です。これは、`todo` オブジェクトの `task`
   * プロパティを更新するために使用されます。
   */
  const edit = (task) => {
    const todo = findById(editId.value)
    const idx = findIndexById(editId.value)
    todo.task = task
    todoListRef.value.splice(idx, 1, todo)
    localStorage.todoList = JSON.stringify(todoListRef.value)
    editId.value = -1
  }

  /**
   * この機能は、ToDo リストからタスクを削除し、削除する前にユーザーに確認を求めます。
   * @param id - 「id」パラメータは、削除する必要がある特定の Todo アイテムの一意の識別子です。これは、`todoListRef` 配列内の対応する todo
   * 項目を検索し、配列から削除するために使用されます。
   * @returns ユーザーが削除を確認しない場合、関数は何も返しません (未定義)。ユーザーが削除を確認すると、関数は対応する todo 項目を `todoListRef`
   * 配列から削除し、`localStorage.todoList` 値を更新します。ただし、この場合は明示的には何も返されません。
   */
  const del = (id) => {
    const todo = findById(id)
    const delMsg = '「' + todo.task + '」を削除しますか？'
    if (!confirm(delMsg)) {
      return
    }

    const idx = findIndexById(id)
    todoListRef.value.splice(idx, 1)
    localStorage.todoList = JSON.stringify(todoListRef.value)
  }

  /**
   * この関数は、todo アイテムのチェックされたプロパティを切り替え、todo リストとローカル ストレージ内でそれを更新します。
   * @param id - `id` パラメータは、`todoListRef` 配列内の todo 項目の一意の識別子です。これは、配列内の対応する todo 項目オブジェクトを検索し、その
   * `checked` プロパティを切り替え、変更された todo 項目で配列を更新し、更新された配列をローカル ストレージに保存するために使用されます。
   */
  const check = (id) => {
    const todo = findById(id)
    const idx = findIndexById(id)
    todo.checked = !todo.checked
    todoListRef.value.splice(idx, 1, todo)
    localStorage.todoList = JSON.stringify(todoListRef.value)
  }

  return { todoListRef, add, show, edit, del, check }
}
