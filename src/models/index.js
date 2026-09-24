// Importa a instância configurada do Sequelize (conexão com o banco de dados)
const sequelize = require('../config/database');

// Importa o modelo Profile (representa perfis de usuários)
const Profile = require('./Profile');

// Importa o modelo Project (representa projetos criados pelos perfis)
const Project = require('./Project');

// Importa o modelo Technology (representa tecnologias usadas nos projetos)
const Technology = require('./Technology');

// Importa o modelo Feedback (representa feedbacks dados aos projetos)
const Feedback = require('./Feedback');

/* ============================================================
 * RELACIONAMENTOS ENTRE MODELOS
 * ============================================================ */

// Define que um Profile pode ter vários Projects
// - hasMany: um para muitos
// - foreignKey: chave estrangeira em Project que referencia Profile
// - as: nome usado para acessar os projetos de um perfil (profile.projects)
// - onDelete: 'CASCADE' garante que ao excluir um Profile, seus Projects também sejam excluídos
Profile.hasMany(Project, { foreignKey: 'profileId', as: 'projects', onDelete: 'CASCADE' });

// Define que cada Project pertence a um Profile
// - belongsTo: muitos para um
// - foreignKey: chave estrangeira em Project que aponta para Profile
// - as: nome usado para acessar o perfil de um projeto (project.profile)
Project.belongsTo(Profile, { foreignKey: 'profileId', as: 'profile' });

// Define relacionamento muitos-para-muitos entre Project e Technology
// - belongsToMany: cria relação N:N
// - through: nome da tabela de junção (project_technologies)
// - foreignKey: chave estrangeira que conecta Project à tabela de junção
// - otherKey: chave estrangeira que conecta Technology à tabela de junção
// - as: nome usado para acessar tecnologias de um projeto (project.technologies)
Project.belongsToMany(Technology, {
  through: 'project_technologies',
  foreignKey: 'projectId',
  otherKey: 'technologyId',
  as: 'technologies',
});

// Define relacionamento muitos-para-muitos do outro lado (Technology -> Project)
// - through: mesma tabela de junção (project_technologies)
// - foreignKey: chave estrangeira que conecta Technology à tabela de junção
// - otherKey: chave estrangeira que conecta Project à tabela de junção
// - as: nome usado para acessar projetos de uma tecnologia (technology.projects)
Technology.belongsToMany(Project, {
  through: 'project_technologies',
  foreignKey: 'technologyId',
  otherKey: 'projectId',
  as: 'projects',
});

// Define que um Project pode ter vários Feedbacks
// - hasMany: um para muitos
// - foreignKey: chave estrangeira em Feedback que referencia Project
// - as: nome usado para acessar feedbacks de um projeto (project.feedbacks)
// - onDelete: 'CASCADE' garante que ao excluir um Project, seus Feedbacks também sejam excluídos
Project.hasMany(Feedback, { foreignKey: 'projectId', as: 'feedbacks', onDelete: 'CASCADE' });

// Define que cada Feedback pertence a um Project
// - belongsTo: muitos para um
// - foreignKey: chave estrangeira em Feedback que aponta para Project
// - as: nome usado para acessar o projeto de um feedback (feedback.project)
Feedback.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });

// Exporta todos os modelos e a instância do Sequelize
// Isso permite importar em outros arquivos e usar os relacionamentos definidos
module.exports = {
  sequelize,
  Profile,
  Project,
  Technology,
  Feedback,
};
