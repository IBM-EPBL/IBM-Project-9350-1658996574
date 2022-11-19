import $ from 'jquery'
const NAME = 'TodoList'
const DATA_KEY = 'lte.todolist'
const JQUERY_NO_CONFLICT = $.fn[NAME]

const SELECTOR_DATA_TOGGLE = '[data-widget="todo-list"]'
const CLASS_NAME_TODO_LIST_DONE = 'done'
const Default = {
  onCheck(item) {
    return item
  },
  onUnCheck(item) {
    return item
  }
}
class TodoList {
  constructor(element, config) {
    this._config = config
    this._element = element

    this._init()
  }

  toggle(item) {
    item.parents('li').toggleClass(CLASS_NAME_TODO_LIST_DONE)
    if (!$(item).prop('checked')) {
      this.unCheck(item)
      return
    }

    this.check(item)
  }

  check(item) {
    this._config.onCheck(item)
  }

  unCheck(item) {
    this._config.onUnCheck(item)
  }
  _init() {
    const $toggleSelector = this._element

    $toggleSelector.find('input:checkbox:checked').parents('li').toggleClass(CLASS_NAME_TODO_LIST_DONE)
    $toggleSelector.on('change', 'input:checkbox', event => {
      this.toggle($(event.target))
    })
  }
  static _jQueryInterface(config) {
    return this.each(function () {
      let data = $(this).data(DATA_KEY)
      const _config = $.extend({}, Default, typeof config === 'object' ? config : $(this).data())

      if (!data) {
        data = new TodoList($(this), _config)
        $(this).data(DATA_KEY, data)
        data._init()
      } else if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`)
        }

        data[config]()
      } else if (typeof config === 'undefined') {
        data._init()
      }
    })
  }
}


$(window).on('load', () => {
  TodoList._jQueryInterface.call($(SELECTOR_DATA_TOGGLE))
})
$.fn[NAME] = TodoList._jQueryInterface
$.fn[NAME].Constructor = TodoList
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return TodoList._jQueryInterface
}

export default TodoList
Footer
