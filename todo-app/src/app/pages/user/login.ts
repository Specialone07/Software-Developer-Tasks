import { LoginToBackend, StatefulWidget } from "mftsccs-browser";
import { saveTolocalStorage } from "./login.service";
import { updateContent } from "../../routes/renderRoute.service";

export class login extends StatefulWidget {

  before_render(): void {
    this.render();
  }

  after_render(): void {

    const email = this.getElementById("email") as HTMLInputElement; // ✅ FIXED
    const password = this.getElementById("password") as HTMLInputElement;
    const submit = this.getElementById("submit");

    if (submit) {
      submit.onclick = (ev: Event) => {
        ev.preventDefault();

        if (!email.value || !password.value) {
          this.showError("Please fill all fields");
          return;
        }

        LoginToBackend(email.value, password.value)
          .then((output: any) => {
            saveTolocalStorage(output);
            updateContent('/todo');
          })
          .catch((err: any) => {
            this.showError(err.message);
          });
      };
    }
  }

  // ✅ error function
  showError(message: string) {
    const error = this.getElementById("error");
    if (error) {
      error.innerHTML = message;
    }
  }

  getHtml(): string {
    return `
      <div class="no-page">
        <div class="container">
          <form>
            <h2 style="text-align:center; margin-bottom:1rem;">Login</h2>

            <div class="formbody">
              <label>Email</label>
              <input type="text" id="email" placeholder="Enter email">
            </div>

            <div class="formbody">
              <label>Password</label>
              <input type="password" id="password" placeholder="Enter password">
            </div>

            <!-- ❌ Removed bootstrap class -->
            <button id="submit" type="submit">Login</button>

            <div id="error" style="color:red;"></div>
          </form>
        </div>
      </div>
    `;
  }
}