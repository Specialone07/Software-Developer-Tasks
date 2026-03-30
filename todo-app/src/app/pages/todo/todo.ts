import "./todo.style.css";
import { StatefulWidget } from "mftsccs-browser";
import { todoCreate } from "./todo-create";
import { todoList }   from "./todo-list";

export class todo extends StatefulWidget {
  private creating!: todoCreate;
  private listing!: todoList;

  before_render(): void {}

  after_render(): void {
    this.mount_child();
  }

  mount_child(): void {
    const createMount = this.getElementById("todo-create-mount");
    const listMount   = this.getElementById("todo-list-mount");

    if (createMount && createMount.children.length > 0) return;
    if (listMount   && listMount.children.length   > 0) return;

    this.creating = new todoCreate();
    this.listing  = new todoList();

    if (createMount) {
      // ✅ When task is saved, tell the list to refresh
      this.creating.onSaved = () => {
        this.listing.refreshList();
      };
      this.childWidgets.push(this.creating);
      this.creating.mount(createMount);
    }

    if (listMount) {
      this.listing.dataChange((value: any) => {
        this.creating.data = value;
        this.creating.render();
      });
      this.childWidgets.push(this.listing);
      this.listing.mount(listMount);
    }
  }

  getHtml(): string {
    return `
      <div class="todo-wrapper">
        <div id="todo-create-mount"></div>
        <div id="todo-list-mount"></div>
      </div>
    `;
  }
}