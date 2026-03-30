import {
  CreateTheConnectionLocal,
  DeleteConnectionByType,
  LocalSyncData,
  MakeTheInstanceConceptLocal,
  MakeTheTypeConceptLocal,
  PRIVATE,
  StatefulWidget,
} from "mftsccs-browser";
import { getLocalUserId } from "../user/login.service";

export class todoCreate extends StatefulWidget {

  onSaved: (() => void) | null = null;

  before_render(): void {}

  after_render(): void {
    const titleInput = this.getElementById("task-title")       as HTMLInputElement;
    const descInput  = this.getElementById("task-description") as HTMLTextAreaElement;
    const submit     = this.getElementById("task-submit")      as HTMLButtonElement;
    const titleError = this.getElementById("title-error");
    const idField    = this.getElementById("task-id")          as HTMLInputElement;

    if (this.data) {
      titleInput.value = this.data.title       ?? "";
      descInput.value  = this.data.description ?? "";
      if (idField) idField.value = this.data.id ?? "";
      if (submit)  submit.textContent = "Update Task";
    }

    if (submit) {
      const freshSubmit = submit.cloneNode(true) as HTMLButtonElement;
      submit.parentNode?.replaceChild(freshSubmit, submit);

      freshSubmit.onclick = (ev: Event) => {
        ev.preventDefault();

        const currentTitle = titleInput.value.trim();
        const currentDesc  = descInput.value.trim();
        const currentId    = idField?.value ? Number(idField.value) : null;

        if (!currentTitle) {
          if (titleError) titleError.classList.remove("hidden");
          titleInput.focus();
          return;
        }
        if (titleError) titleError.classList.add("hidden");

        freshSubmit.disabled    = true;
        freshSubmit.textContent = "Saving…";

        if (currentId) {
          this.updateTask(currentId, currentTitle, currentDesc, freshSubmit);
        } else {
          this.createTask(currentTitle, currentDesc, freshSubmit);
        }
      };
    }
  }

  private createTask(title: string, description: string, btn: HTMLButtonElement): void {
    const userId = getLocalUserId();
    const ORDER  = 1000;

    MakeTheInstanceConceptLocal("the_task", "", true, userId, PRIVATE)
      .then((taskConcept) => {
        MakeTheTypeConceptLocal("the_task_title", 999, 999, userId).then((titleType) => {
          MakeTheTypeConceptLocal("the_task_description", 999, 999, userId).then((descType) => {
            MakeTheTypeConceptLocal("the_task_status", 999, 999, userId).then((statusType) => {
              MakeTheInstanceConceptLocal("name", title, false, userId, PRIVATE).then((titleConcept) => {
                MakeTheInstanceConceptLocal("description", description, false, userId, PRIVATE).then((descConcept) => {
                  MakeTheInstanceConceptLocal("status", "pending", false, userId, PRIVATE).then((statusConcept) => {
                    CreateTheConnectionLocal(taskConcept.id, titleConcept.id, titleType.id, ORDER, "", userId).then(() => {
                      CreateTheConnectionLocal(taskConcept.id, descConcept.id, descType.id, ORDER, "", userId).then(() => {
                        CreateTheConnectionLocal(taskConcept.id, statusConcept.id, statusType.id, ORDER, "", userId).then(() => {
                          LocalSyncData.SyncDataOnline().then(() => {
                            this.resetForm(btn);
                            if (this.onSaved) this.onSaved();
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      })
      .catch((err: any) => {
        console.error("[todoCreate] createTask error", err);
        btn.disabled    = false;
        btn.textContent = "Add Task";
      });
  }

  private updateTask(taskId: number, title: string, description: string, btn: HTMLButtonElement): void {
    const userId = getLocalUserId();
    const ORDER  = 1000;

    DeleteConnectionByType(taskId, "the_task_title").then(() => {
      DeleteConnectionByType(taskId, "the_task_description").then(() => {
        MakeTheTypeConceptLocal("the_task_title", 999, 999, userId).then((titleType) => {
          MakeTheTypeConceptLocal("the_task_description", 999, 999, userId).then((descType) => {
            MakeTheInstanceConceptLocal("name", title, false, userId, PRIVATE).then((titleConcept) => {
              MakeTheInstanceConceptLocal("description", description, false, userId, PRIVATE).then((descConcept) => {
                CreateTheConnectionLocal(taskId, titleConcept.id, titleType.id, ORDER, "", userId).then(() => {
                  CreateTheConnectionLocal(taskId, descConcept.id, descType.id, ORDER, "", userId).then(() => {
                    LocalSyncData.SyncDataOnline().then(() => {
                      this.data = null;
                      this.resetForm(btn);
                      if (this.onSaved) this.onSaved();
                    });
                  });
                });
              });
            });
          });
        });
      });
    }).catch((err: any) => {
      console.error("[todoCreate] updateTask error", err);
      btn.disabled    = false;
      btn.textContent = "Update Task";
    });
  }

  private resetForm(btn: HTMLButtonElement): void {
    const titleInput = this.getElementById("task-title")       as HTMLInputElement;
    const descInput  = this.getElementById("task-description") as HTMLTextAreaElement;
    const idField    = this.getElementById("task-id")          as HTMLInputElement;

    if (titleInput) titleInput.value = "";
    if (descInput)  descInput.value  = "";
    if (idField)    idField.value    = "";

    btn.disabled    = false;
    btn.textContent = "Add Task";
  }

  getHtml(): string {
    return `
      <div class="widget-card">
        <h2 class="widget-title">Add New Task</h2>
        <form novalidate>
          <input type="number" id="task-id" hidden />
          <div class="field-group">
            <label for="task-title">Title <span class="required">*</span></label>
            <input type="text" id="task-title" placeholder="What needs to be done?" autocomplete="off" required />
            <p class="field-error hidden" id="title-error">Title is required.</p>
          </div>
          <div class="field-group">
            <label for="task-description">Description</label>
            <textarea id="task-description" rows="3" placeholder="Optional details…"></textarea>
          </div>
          <button class="btn btn-primary" id="task-submit" type="submit">Add Task</button>
        </form>
      </div>
    `;
  }
}