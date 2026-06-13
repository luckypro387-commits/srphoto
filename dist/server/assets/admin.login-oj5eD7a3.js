import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { s as supabase } from "./client-DoNzAdgV.js";
import { u as useAuth, L as Label, I as Input, B as Button } from "./label-vWs9rHRt.js";
import { toast } from "sonner";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
import "clsx";
import "tailwind-merge";
function AdminLogin() {
  const navigate = useNavigate();
  const {
    user,
    isAdmin,
    loading
  } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (!loading && user && isAdmin) navigate({
      to: "/admin"
    });
  }, [loading, user, isAdmin, navigate]);
  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const {
        error
      } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      toast.success("Welcome back");
    } catch (err) {
      toast.error(err.message ?? "Authentication failed");
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-background text-foreground p-6", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-sm space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-light tracking-tight", children: "Admin" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-1 uppercase tracking-widest", children: "Sign in to continue" })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
        /* @__PURE__ */ jsx(Input, { id: "email", type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
        /* @__PURE__ */ jsx(Input, { id: "password", type: "password", required: true, minLength: 6, value: password, onChange: (e) => setPassword(e.target.value) })
      ] }),
      /* @__PURE__ */ jsx(Button, { type: "submit", disabled: busy, className: "w-full", children: busy ? "Please wait…" : "Sign in" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx(Link, { to: "/", className: "text-xs text-muted-foreground uppercase tracking-widest hover:text-foreground", children: "← Back to site" }) })
  ] }) });
}
export {
  AdminLogin as component
};
