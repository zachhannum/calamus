import { Extension } from '@codemirror/state';
import {
  ViewPlugin,
  EditorView,
  Decoration,
  DecorationSet,
  WidgetType,
} from '@codemirror/view';

class Placeholder extends WidgetType {
  constructor(readonly content: string | HTMLElement) {
    super();
  }

  toDOM() {
    let wrap = document.createElement('span');
    wrap.className = 'cm-placeholder';
    wrap.style.pointerEvents = 'none';
    wrap.appendChild(
      typeof this.content == 'string'
        ? document.createTextNode(this.content)
        : this.content
    );
    if (typeof this.content == 'string')
      wrap.setAttribute('aria-label', 'placeholder ' + this.content);
    else wrap.setAttribute('aria-hidden', 'true');
    return wrap;
  }

  ignoreEvent() {
    return false;
  }
}

/// Extension that enables a placeholder—a piece of example content
/// to show when the editor is empty.
const placeholder = (): Extension => {
  return ViewPlugin.fromClass(
    class {
      placeholder: DecorationSet;

      constructor(readonly view: EditorView) {
        const placeholderText = 'Start writing...';

        this.placeholder = Decoration.set([
          Decoration.widget({
            widget: new Placeholder(placeholderText),
            side: 1,
          }).range(0),
        ]);
      }

      update!: () => void; // Kludge to convince TypeScript that this is a plugin value

      get decorations() {
        return this.view.state.doc.length ? Decoration.none : this.placeholder;
      }
    },
    { decorations: (v) => v.decorations }
  );
};

export default placeholder;
