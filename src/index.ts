import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  InputDialog,
  ToolbarButton
} from '@jupyterlab/apputils';

  
import { DocumentRegistry } from '@jupyterlab/docregistry';

import {
  INotebookModel,
  NotebookPanel
} from '@jupyterlab/notebook';

import { DisposableDelegate, IDisposable } from '@lumino/disposable';
import { LabIcon } from '@jupyterlab/ui-components';

import {
  Formatter
} from './formatter';

/**
 * Initialization data for the myextension extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'myextension',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    let {commands, docRegistry} = app;
    console.log(commands);
    let extension = new NBDiffExtension(app);
    docRegistry.addWidgetExtension('Notebook', extension);
    console.log('JupyterLab extension myextension is activated!');
  }
};

const ICON_FORMAT_ALL_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>';

class NBDiffExtension implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
  private app: JupyterFrontEnd;

  constructor(
    app: JupyterFrontEnd
  ) {
    this.app = app;
  }

  createNew(
     nb: NotebookPanel,
     context: DocumentRegistry.IContext<INotebookModel>
  ): IDisposable {
    console.log('createNew');
    const button = new ToolbarButton({
      tooltip: 'TESTTEST',
      icon: new LabIcon({
        name: "TEST",
        svgstr: ICON_FORMAT_ALL_SVG
      }),
      onClick: () => {
        const options = ['one', 'two', 'three'];
        return InputDialog.getItem({
          title: 'Pick an option to persist by the State Example extension',
          items: options,
          current: Math.max(0, options.indexOf('one'))
        })
        .then(result =>{
            const formatter = new Formatter();
            const selectedCells = formatter.getCodeCells(true, nb.content);
            if (selectedCells.length === 0) {
                return;
            }
            const currentText = selectedCells[0].model.value.text;
            
            selectedCells[0].model.value.text = currentText + '\nYoooooooooooooooooo';
        });
      }
    });
    nb.toolbar.insertAfter(
      'cellType',
      this.app.commands.label("TEST2"),
      button
    );
    return new DisposableDelegate(() => {
      button.dispose();
    });
  }
}


export default extension;
