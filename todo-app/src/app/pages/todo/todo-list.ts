import {
  DeleteConceptById,
  FreeschemaQuery,
  JUSTDATA,
  SchemaQueryListener,
  StatefulWidget,
} from "mftsccs-browser";

export class todoList extends StatefulWidget {
  tasks: any[] = [];
  private subscription: any = null;

  before_render(): void {}

 after_render(): void {
  const profile = localStorage.getItem("profile");

  if (!profile) {
    console.warn("[todoList] Waiting for auth...");
    setTimeout(() => this.after_render(), 500);
    return;
  }

  // 🔥 Always clean old broken subscription
  if (this.subscription) {
    this.subscription.unsubscribe();
    this.subscription = null;
  }

  console.log("[todoList] Subscribing to tasks...");

  const titleQuery = new FreeschemaQuery();
  titleQuery.typeConnection = "the_task_title";
  titleQuery.name = "taskTitle";

  const freeschemaQuery = new FreeschemaQuery();
  freeschemaQuery.type = "the_task";
  freeschemaQuery.name = "top";
  freeschemaQuery.freeschemaQueries = [titleQuery];
  freeschemaQuery.outputFormat = JUSTDATA;
  freeschemaQuery.selectors = ["the_task_description", "the_task_status"];
  freeschemaQuery.isSecure = true;

  this.subscription = SchemaQueryListener(freeschemaQuery, "")
    .subscribe((data: any) => {
      console.log("[todoList] Data received:", data);

      // 🔥 IMPORTANT: handle empty / rejected case
      if (!data || data.length === 0) {
        console.warn("[todoList] Empty data, retrying...");

        setTimeout(() => {
          this.after_render(); // 🔁 retry
        }, 500);

        return;
      }

      this.tasks = data;
      this.populateTable();
    });
}
 public refreshList(): void {
  if (this.subscription) {
    this.subscription.unsubscribe();
  }

  this.subscription = null;
  this.after_render();
}

  private populateTable(): void {
  const tbody = this.getElementById("task-tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  if (!this.tasks || this.tasks.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="empty-state">No tasks yet. Add one above!</td>
      </tr>`;
    return;
  }

  for (let i = 0; i < this.tasks.length; i++) {
    const item   = this.tasks[i];
    const taskId = item?.id;
    const task   = item?.the_task;
    if (!taskId || !task) continue;

    const titleVal  = task?.the_task_title?.the_name?.data             ?? "(no title)";
    const descVal   = task?.the_task_description?.the_description?.data ?? "";
    const statusVal = task?.the_task_status?.the_status?.data           ?? "pending";

    const row = document.createElement("tr");
    row.className = statusVal === "done" ? "task-row done" : "task-row";

    // Title cell
    const tdTitle = document.createElement("td");
    tdTitle.className = "td-title";
    tdTitle.innerHTML = `
      <span class="task-title-text">${this.esc(titleVal)}</span>
      ${descVal ? `<span class="task-desc-text">${this.esc(descVal)}</span>` : ""}
    `;

    // Status dropdown cell
    const tdStatus = document.createElement("td");
    tdStatus.className = "td-status";
    const select = document.createElement("select");
    select.className = `status-select status-${statusVal}`;
    select.innerHTML = `
      <option value="pending"     ${statusVal === "pending"     ? "selected" : ""}>Pending</option>
      <option value="in-progress" ${statusVal === "in-progress" ? "selected" : ""}>In Progress</option>
      <option value="done"        ${statusVal === "done"        ? "selected" : ""}>Done</option>
    `;

    select.onchange = () => {
      const newStatus = select.value;
      this.updateStatus(Number(taskId), newStatus, row, select);
    };
    tdStatus.appendChild(select);

    // Delete cell
    const tdDelete = document.createElement("td");
    tdDelete.className = "td-action";
    const deleteBtn = document.createElement("button");
    deleteBtn.className   = "btn btn-danger";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      if (confirm("Delete this task? This cannot be undone.")) {
        DeleteConceptById(Number(taskId)).then(() => {
          row.remove();
        }).catch((err: any) => {
          console.error("[todoList] Delete error", err);
        });
      }
    };
    tdDelete.appendChild(deleteBtn);

    // Edit cell
    const tdEdit  = document.createElement("td");
    tdEdit.className = "td-action";
    const editBtn = document.createElement("button");
    editBtn.className   = "btn btn-ghost";
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      this.data = {
        id:          taskId,
        title:       titleVal,
        description: descVal,
        status:      statusVal,
      };
      this.notify();
    };
    tdEdit.appendChild(editBtn);

    row.appendChild(tdTitle);
    row.appendChild(tdStatus);
    row.appendChild(tdDelete);
    row.appendChild(tdEdit);
    tbody.appendChild(row);
  }
}

  private statusLabel(status: string): string {
    const labels: Record<string, string> = {
      "pending":     "Pending",
      "in-progress": "In Progress",
      "done":        "Done",
    };
    return labels[status] ?? status;
  }

  private esc(str: string): string {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  getHtml(): string {
    return `
      <div class="widget-card">
        <h2 class="widget-title">My Tasks</h2>
        <div class="table-wrap">
          <table class="task-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Status</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody id="task-tbody"></tbody>
          </table>
        </div>
      </div>
    `;
  }
}