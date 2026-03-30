import { Signup, SignupModel } from "mftsccs-browser";
import { StatefulWidget } from "mftsccs-browser";
import { updateContent } from "../../routes/renderRoute.service";

export class register extends StatefulWidget {

    after_render(): void {
        const email = this.getElementById("email") as HTMLInputElement;
        const password = this.getElementById("password") as HTMLInputElement;
        const verifyPassword = this.getElementById("verify-password") as HTMLInputElement;
        const submitButton = this.getElementById("submit");

        if (submitButton) {
            submitButton.onclick = (ev: Event) => {
                ev.preventDefault();

                // simple validation
                if(password.value !== verifyPassword.value) {
                    this.showError("Passwords do not match");
                    return;
                }

                const signupData: SignupModel = {
                    email: email.value,
                    password: password.value
                };

                Signup(signupData)
                    .then(() => {
                        updateContent('/login');
                    })
                    .catch((err) => {
                        this.showError(err.message);
                    });
            };
        }
    }

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
                        <h2 style="text-align:center; margin-bottom:1rem;">Register</h2>

                        <div class="formbody">
                            <label>Email</label>
                            <input type="text" id="email" placeholder="Enter email">
                        </div>

                        <div class="formbody">
                            <label>Password</label>
                            <input type="password" id="password" placeholder="Enter password">
                        </div>

                        <div class="formbody">
                            <label>Repeat Password</label>
                            <input type="password" id="verify-password" placeholder="Repeat password">
                        </div>

                        <button id="submit">Sign Up</button>

                        <div id="error" style="color:red;"></div>
                    </form>
                </div>
            </div>
        `;
    }
}