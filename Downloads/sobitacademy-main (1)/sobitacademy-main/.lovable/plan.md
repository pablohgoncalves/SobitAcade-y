
# Implementação de Autenticação Real com Lovable Cloud

## Resumo
Substituir o sistema de login simulado (localStorage) por autenticação real usando o backend integrado. Após a implementação, você poderá criar uma conta com seu email `pablohgoncalves04@gmail.com` e acessar o painel admin.

---

## O que será implementado

### 1. Hook de Autenticação Centralizado
Criar `src/hooks/useAuth.ts` para gerenciar:
- Estado do usuário autenticado
- Funções de login (`signIn`) e logout (`signOut`)
- Função de cadastro (`signUp`)
- Listener para mudanças de sessão

### 2. Atualizar Página de Login
Modificar `src/pages/Login.tsx`:
- Substituir `setTimeout` simulado por chamada real de autenticação
- Adicionar opção para criar conta (registro)
- Tratar erros específicos (credenciais inválidas, usuário não encontrado)
- Adicionar toggle entre "Entrar" e "Criar Conta"

### 3. Atualizar Dashboard
Modificar `src/pages/Dashboard.tsx`:
- Substituir verificação via `localStorage` pelo hook `useAuth`
- Logout usando função real de signOut

### 4. Atualizar Página de Aula
Modificar `src/pages/Lesson.tsx`:
- Mesmas atualizações do Dashboard
- Usar hook `useAuth` para verificar sessão

### 5. Atualizar Painel Admin
Modificar `src/pages/Admin.tsx`:
- Substituir verificação `localStorage` pelo hook `useAuth`
- O hook `useAdmin` já verifica role no banco de dados

### 6. Configurar Auto-Confirm de Email
Habilitar confirmação automática de email para que você possa fazer login imediatamente após criar conta.

### 7. Adicionar Role de Admin
Após você criar sua conta, inserir registro na tabela `user_roles` com role `admin` para o email `pablohgoncalves04@gmail.com`.

---

## Arquivos Afetados

| Arquivo | Ação | Descrição |
|---------|------|-----------|
| `src/hooks/useAuth.ts` | Criar | Hook centralizado de autenticação |
| `src/pages/Login.tsx` | Modificar | Login/registro real com Supabase Auth |
| `src/pages/Dashboard.tsx` | Modificar | Usar `useAuth` em vez de localStorage |
| `src/pages/Lesson.tsx` | Modificar | Usar `useAuth` em vez de localStorage |
| `src/pages/Admin.tsx` | Modificar | Usar `useAuth` em vez de localStorage |

---

## Detalhes Técnicos

### Hook useAuth
```typescript
// Estados exportados:
- user: User | null
- isLoading: boolean
- isAuthenticated: boolean

// Funções exportadas:
- signIn(email, password): Promise
- signUp(email, password): Promise  
- signOut(): Promise
```

### Fluxo de Login
```text
Usuário preenche email e senha
         │
         ▼
  ┌──────────────────┐
  │ Modo: Entrar?    │
  └──────────────────┘
         │
    ┌────┴────┐
    ▼         ▼
 Entrar    Cadastrar
    │         │
    ▼         ▼
signIn()  signUp()
    │         │
    └────┬────┘
         ▼
   ┌───────────┐
   │ Sucesso?  │
   └───────────┘
    │         │
    ▼         ▼
Dashboard   Exibe erro
```

### Página de Login (nova estrutura)
- Input de email
- Input de senha (com toggle de visibilidade)
- Botão principal: "Entrar" ou "Criar Conta"
- Link para alternar entre modos
- Tratamento de erros com mensagens amigáveis

---

## Fluxo para você acessar o Admin

1. Acesse `/login`
2. Clique em "Criar conta"
3. Use o email `pablohgoncalves04@gmail.com` e uma senha
4. Após criar, faça login com essas credenciais
5. Eu adicionarei seu `user_id` na tabela `user_roles` com role `admin`
6. O botão "Admin" aparecerá no header
7. Acesse `/admin` para gerenciar vídeos

---

## Observações de Segurança

- A verificação de admin continua sendo feita via banco de dados (tabela `user_roles`)
- O hook `useAdmin` já está implementado corretamente usando `security definer`
- Não há exposição de credenciais ou roles no client-side
- RLS policies já existentes protegem a tabela `user_roles`
