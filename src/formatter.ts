import { Cell, CodeCell } from '@jupyterlab/cells';
import { Notebook } from '@jupyterlab/notebook';

export class Formatter {

  constructor(
  ) {
  }

  getCodeCells(selectedOnly = true, notebook?: Notebook): CodeCell[] {
    const codeCells: CodeCell[] = [];
    //notebook = notebook || this.notebookTracker.currentWidget.content;
    notebook.widgets.forEach((cell: Cell) => {
      if (cell.model.type === 'code') {
        if (!selectedOnly || notebook.isSelectedOrActive(cell)) {
          codeCells.push(cell as CodeCell);
        }
      }
    });
    return codeCells;
  }

}