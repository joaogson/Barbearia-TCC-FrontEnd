(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/Auth/FormRegister/register.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// pages/register.tsx (ou onde quer que seu componente Register esteja)
__turbopack_context__.s([
    "default",
    ()=>Register
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function Register() {
    _s();
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [confirmPassword, setConfirmPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [phone, setPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    // ✅ RENOMEADO: `serverError` para erros que vêm do backend
    const [serverError, setServerError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // ✅ CORRIGIDO: `isSubmitting` com seu setter
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Estado para erros de validação de cada campo no frontend
    const [validationErrors, setValidationErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const { register } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const handleChange = (e)=>{
        const { name, value } = e.target;
        // Limpa o erro do campo atual ao digitar
        setValidationErrors((prevErrors)=>{
            const newErrors = {
                ...prevErrors
            };
            delete newErrors[name]; // Remove o erro específico do campo
            return newErrors;
        });
        // Limpa a mensagem de erro do servidor ao digitar em qualquer campo
        setServerError(null);
        // Atualiza o estado do campo correspondente
        switch(name){
            case "name":
                setName(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "phone":
                setPhone(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "confirmPassword":
                setConfirmPassword(value);
                break;
            default:
                break;
        }
    };
    const validateForm = ()=>{
        const errors = {};
        // Validação de campos obrigatórios e formato
        if (!name.trim()) {
            errors.name = "O nome é obrigatório.";
        }
        if (!email.trim()) {
            errors.email = "O e-mail é obrigatório.";
        } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
            errors.email = "Formato de e-mail inválido.";
        }
        if (!phone.trim()) {
            errors.phone = "O telefone é obrigatório.";
        } else if (!/^\d{10,11}$/.test(phone.trim())) {
            // Ajuste a regex se o formato for diferente
            errors.phone = "O telefone deve ter 10 ou 11 dígitos.";
        }
        if (!password.trim()) {
            errors.password = "A senha é obrigatória.";
        } else if (password.trim().length < 8) {
            // Mínimo de 8 caracteres, por exemplo
            errors.password = "A senha deve ter no mínimo 8 caracteres.";
        }
        if (!confirmPassword.trim()) {
            errors.confirmPassword = "A confirmação de senha é obrigatória.";
        } else if (password !== confirmPassword) {
            // Senhas devem coincidir
            errors.confirmPassword = "As senhas não coincidem.";
        }
        setValidationErrors(errors); // Atualiza o estado de erros de validação
        return Object.keys(errors).length === 0; // Retorna true se não houver erros
    };
    const handleSubmit = async (e)=>{
        e.preventDefault(); // Previne o comportamento padrão do formulário
        setIsSubmitting(true); // Ativa o estado de submissão
        setServerError(null); // Limpa erros anteriores do servidor
        setValidationErrors({}); // Limpa erros de validação anteriores
        // 1. Executa a validação do formulário no frontend
        const isValid = validateForm();
        if (!isValid) {
            setIsSubmitting(false); // Desativa o estado de submissão se houver erros de validação
            return; // Para aqui se houver erros de validação
        }
        try {
            const credentials = {
                name: name.trim(),
                email: email.trim(),
                phone: phone.trim(),
                password: password.trim()
            };
            // 2. Chama a função `register` do contexto
            const result = await register(credentials);
            if (!result.success) {
                // Se a função `register` do contexto indicou um erro do servidor
                if (result.message.includes("Email já cadastrado")) {
                    setServerError("E-mail já cadastrado. Por favor, use outro e-mail.");
                } else {
                    setServerError(result.message); // Exibe a mensagem de erro genérica do servidor
                }
            }
        // Se `result.success` for `true`, o redirecionamento já ocorreu dentro do contexto.
        // Não há `else` aqui para o caso de sucesso.
        } catch (err) {
            // Este catch é para erros muito inesperados (ex: JS error antes da chamada)
            console.error("Erro final no handleSubmit do RegisterPage:", err);
            let errorMessage = "Ocorreu um erro inesperado. Tente novamente mais tarde.";
            if (err instanceof Error) {
                errorMessage = err.message;
            } else if (typeof err === "string") {
                errorMessage = err;
            }
            setServerError(errorMessage);
        } finally{
            setIsSubmitting(false); // ✅ Desativa o estado de submissão no final, independente do resultado
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "register-box",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container-register",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "register-title",
                        children: "Cadastrar"
                    }, void 0, false, {
                        fileName: "[project]/components/Auth/FormRegister/register.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        className: "form-register",
                        onSubmit: handleSubmit,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "register-style",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "name",
                                        children: "Nome Completo"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Auth/FormRegister/register.tsx",
                                        lineNumber: 156,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "name",
                                        type: "text",
                                        name: "name",
                                        value: name,
                                        onChange: handleChange,
                                        className: validationErrors.name ? "input-error" : ""
                                    }, void 0, false, {
                                        fileName: "[project]/components/Auth/FormRegister/register.tsx",
                                        lineNumber: 157,
                                        columnNumber: 13
                                    }, this),
                                    validationErrors.name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            color: "red"
                                        },
                                        className: "validation-error-message",
                                        children: validationErrors.name
                                    }, void 0, false, {
                                        fileName: "[project]/components/Auth/FormRegister/register.tsx",
                                        lineNumber: 167,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Auth/FormRegister/register.tsx",
                                lineNumber: 155,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "register-style",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "phone",
                                        children: "Celular (apenas numeros, sem espaços)"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Auth/FormRegister/register.tsx",
                                        lineNumber: 175,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "phone",
                                        type: "number",
                                        name: "phone",
                                        value: phone,
                                        onChange: handleChange,
                                        className: validationErrors.phone ? "input-error" : ""
                                    }, void 0, false, {
                                        fileName: "[project]/components/Auth/FormRegister/register.tsx",
                                        lineNumber: 176,
                                        columnNumber: 13
                                    }, this),
                                    validationErrors.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            color: "red"
                                        },
                                        className: "validation-error-message",
                                        children: validationErrors.phone
                                    }, void 0, false, {
                                        fileName: "[project]/components/Auth/FormRegister/register.tsx",
                                        lineNumber: 186,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Auth/FormRegister/register.tsx",
                                lineNumber: 174,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "register-style",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "email",
                                        children: "Email"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Auth/FormRegister/register.tsx",
                                        lineNumber: 194,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "email",
                                        type: "email",
                                        name: "email",
                                        value: email,
                                        onChange: handleChange,
                                        className: validationErrors.email ? "input-error" : ""
                                    }, void 0, false, {
                                        fileName: "[project]/components/Auth/FormRegister/register.tsx",
                                        lineNumber: 195,
                                        columnNumber: 13
                                    }, this),
                                    validationErrors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            color: "red"
                                        },
                                        className: "validation-error-message",
                                        children: validationErrors.email
                                    }, void 0, false, {
                                        fileName: "[project]/components/Auth/FormRegister/register.tsx",
                                        lineNumber: 205,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Auth/FormRegister/register.tsx",
                                lineNumber: 193,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "register-style",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "password",
                                        children: "Senha"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Auth/FormRegister/register.tsx",
                                        lineNumber: 213,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "password",
                                        type: "password",
                                        name: "password",
                                        value: password,
                                        onChange: handleChange,
                                        className: validationErrors.password ? "input-error" : ""
                                    }, void 0, false, {
                                        fileName: "[project]/components/Auth/FormRegister/register.tsx",
                                        lineNumber: 214,
                                        columnNumber: 13
                                    }, this),
                                    validationErrors.password && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            color: "red"
                                        },
                                        className: "validation-error-message",
                                        children: validationErrors.password
                                    }, void 0, false, {
                                        fileName: "[project]/components/Auth/FormRegister/register.tsx",
                                        lineNumber: 224,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Auth/FormRegister/register.tsx",
                                lineNumber: 212,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "register-style",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "confirmPassword",
                                        children: "Confirme a senha"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Auth/FormRegister/register.tsx",
                                        lineNumber: 232,
                                        columnNumber: 13
                                    }, this),
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "confirmPassword",
                                        type: "password",
                                        name: "confirmPassword",
                                        value: confirmPassword,
                                        onChange: handleChange,
                                        className: validationErrors.confirmPassword ? "input-error" : ""
                                    }, void 0, false, {
                                        fileName: "[project]/components/Auth/FormRegister/register.tsx",
                                        lineNumber: 233,
                                        columnNumber: 13
                                    }, this),
                                    validationErrors.confirmPassword && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            color: "red"
                                        },
                                        className: "validation-error-message",
                                        children: validationErrors.confirmPassword
                                    }, void 0, false, {
                                        fileName: "[project]/components/Auth/FormRegister/register.tsx",
                                        lineNumber: 243,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Auth/FormRegister/register.tsx",
                                lineNumber: 231,
                                columnNumber: 11
                            }, this),
                            serverError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "server-error-message",
                                style: {
                                    color: "red",
                                    marginTop: "1rem"
                                },
                                children: serverError
                            }, void 0, false, {
                                fileName: "[project]/components/Auth/FormRegister/register.tsx",
                                lineNumber: 253,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Auth/FormRegister/register.tsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "sem-conta",
                        style: {
                            marginTop: "1rem",
                            textAlign: "center"
                        },
                        children: [
                            "Já tem uma conta?",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                className: "link-cadastrar",
                                href: "/login",
                                children: "Faça login"
                            }, void 0, false, {
                                fileName: "[project]/components/Auth/FormRegister/register.tsx",
                                lineNumber: 261,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Auth/FormRegister/register.tsx",
                        lineNumber: 259,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Auth/FormRegister/register.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "submit-button-register",
                type: "submit",
                disabled: isSubmitting,
                style: {
                    width: "100%",
                    padding: "10px"
                },
                onClick: handleSubmit,
                children: isSubmitting ? "Criando conta..." : "Cadastrar"
            }, void 0, false, {
                fileName: "[project]/components/Auth/FormRegister/register.tsx",
                lineNumber: 266,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Auth/FormRegister/register.tsx",
        lineNumber: 149,
        columnNumber: 5
    }, this);
}
_s(Register, "XWXYOgHEwW7/k/31WYazq5skxLo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = Register;
var _c;
__turbopack_context__.k.register(_c, "Register");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(auth)/register/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RegisterPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Auth$2f$FormRegister$2f$register$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Auth/FormRegister/register.tsx [app-client] (ecmascript)");
"use client";
;
;
function RegisterPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            maxWidth: "400px",
            margin: "auto",
            paddingTop: "50px",
            paddingBottom: "50px"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Auth$2f$FormRegister$2f$register$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/src/app/(auth)/register/page.tsx",
            lineNumber: 11,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(auth)/register/page.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_c = RegisterPage;
var _c;
__turbopack_context__.k.register(_c, "RegisterPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_6a7c67fb._.js.map