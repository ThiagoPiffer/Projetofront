import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ObjetosCustomizadosListaComponent } from './componente/objetos-customizados/objetos-customizados-lista/objetos-customizados-lista.component';
import { ObjetosCustomizadosCadastroComponent } from './componente/objetos-customizados/objetos-customizados-cadastro/objetos-customizados-cadastro.component';

import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { CabecalhoComponent } from './componente/cabecalho/cabecalho.component';
import { RodapeComponent } from './componente/rodape/rodape.component';
import { ProcessoListaComponent } from './componente/processo/processo-lista/processo-lista.component';
import { ProcessoDetalheComponent } from './componente/processo/processo-detalhe/processo-detalhe.component';

import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { SidebarModule } from 'primeng/sidebar';
import { AccordionModule } from 'primeng/accordion';
import { StepsModule } from 'primeng/steps';
import { CalendarModule } from 'primeng/calendar';
import { ListboxModule } from 'primeng/listbox';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './helpers/error.interceptor';


import { UtilsService } from './Utils/utils.serive';
import { PessoaCadastroModalComponent } from './componente/Pessoa/pessoa-cadastro-modal/pessoa-cadastro-modal.component';

import { CpfCnpjMaskDirective } from './Utils/cpfCnpjMask-diretiva';
import { IdentidadeMaskDirective } from './Utils/identidadeMask-diretiva';
import { ArquivoProcessoUploadModalComponent } from './componente/arquivo-Processo/arquivo-processo-upload-modal/arquivo-processo-upload-modal.component';
import { ArquivoProcessoInserirDescricaoModalComponent } from './componente/arquivo-Processo/arquivo-processo-inserir-descricao-modal/arquivo-processo-inserir-descricao-modal.component';
import { ProcessoCadastroModalComponent } from './componente/processo/processo-cadastro-modal/processo-cadastro-modal.component';
import { RegistroComponent } from './componente/identidade/registro/registro.component';
import { LoginComponent } from './componente/identidade/login/login.component';
import { JwtInterceptor } from './helpers/JwtInterceptor';


import { CookieService } from 'ngx-cookie-service';
import { MenuLateralComponent } from './componente/menu-lateral/menu-lateral/menu-lateral.component';
import { ArquivoProcessoTemplateUploadModalComponent } from './componente/arquivo-processo-template/arquivo-processo-template-upload-modal/arquivo-processo-template-upload-modal.component';
import { ArquivoProcessoTemplateConfigurarModalComponent } from './componente/arquivo-processo-template/arquivo-processo-template-configurar-modal/arquivo-processo-template-configurar-modal.component';
import { TipoPessoaComponent } from './componente/tipo-pessoa/tipo-pessoa/tipo-pessoa.component';
import { TipoPessoaTemplateComponent } from './componente/tipo-pessoa-template/tipo-pessoa-template/tipo-pessoa-template.component';
import { ControlePessoaExternaComponent } from './componente/controle-pessoa-externa/controle-pessoa-externa/controle-pessoa-externa.component';
import { CadastroPessoaExternaComponent } from './componente/controle-pessoa-externa/cadastro-pessoa-externa/cadastro-pessoa-externa.component';
import { NotificacaoComponent } from './componente/notificacao/notificacao/notificacao.component';
import { PessoaListaComponent } from './componente/Pessoa/pessoa-lista/pessoa-lista.component';
import { PessoaAssociarModalComponent } from './componente/Pessoa/pessoa-associar-modal/pessoa-associar-modal.component';
import { PessoaListaPaginaComponent } from './componente/Pessoa/pessoa-lista-pagina/pessoa-lista-pagina.component';

@NgModule({
  declarations: [
    AppComponent,
    ObjetosCustomizadosListaComponent,
    ObjetosCustomizadosCadastroComponent,
    CabecalhoComponent,
    RodapeComponent,
    ProcessoListaComponent,
    ProcessoDetalheComponent,
    PessoaCadastroModalComponent,
    CpfCnpjMaskDirective,
    IdentidadeMaskDirective,
    ArquivoProcessoUploadModalComponent,
    ArquivoProcessoInserirDescricaoModalComponent,
    ProcessoCadastroModalComponent,
    RegistroComponent,
    LoginComponent,
    MenuLateralComponent,
    ArquivoProcessoTemplateUploadModalComponent,
    ArquivoProcessoTemplateConfigurarModalComponent,
    TipoPessoaComponent,
    TipoPessoaTemplateComponent,
    ControlePessoaExternaComponent,
    CadastroPessoaExternaComponent,
    NotificacaoComponent,
    PessoaListaComponent,
    PessoaAssociarModalComponent,
    PessoaListaPaginaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    TableModule,
    DropdownModule,
    InputMaskModule,
    MenuModule,
    BrowserAnimationsModule,
    DialogModule,
    InputNumberModule,
    InputTextModule,
    ConfirmPopupModule,
    FileUploadModule,
    SidebarModule,
    AccordionModule,
    StepsModule,
    CalendarModule,
    ListboxModule
  ],
  providers: [
    UtilsService,
    DialogService,
    ConfirmationService,
    MessageService,
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
