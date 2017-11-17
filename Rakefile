desc "Deploys the lambda to staging"
task :init do
  Dir.mkdir(".ask") unless Dir.exists?(".ask")
end

task :deploy_staging => ["init"] do
  # Copy the right config to the .ask directory
  puts "\nCopying staging configuration.."
  cmd = "cp ask-config/staging .ask/config"
  fail '\nUnable to copy ask configuration!' unless system(cmd)
  # Copy the right skill.json
  cmd = "cp skills/staging.json skill.json"
  fail '\nUnable to configure skills!' unless system(cmd)

  puts "\nDeploying lambda to staging"
  cmd = "ask deploy -t lambda"
  fail 'Unable to deploy lambda function to staging' unless system(cmd)
  puts "\nDone!"
end

task :deploy_prod => ["init"] do
  # Copy the right config to the .ask directory
  puts "\nCopying staging configuration.."
  cmd = "cp ask-config/production .ask/config"
  fail '\nUnable to copy ask configuration!' unless system(cmd)
  # Copy the right skill.json
  cmd = "cp skills/production.json skill.json"
  fail '\nUnable to configure skills!' unless system(cmd)

  puts "\nDeploying lambda to production"
  cmd = "ask deploy -t lambda"
  fail 'Unable to deploy lambda function to production' unless system(cmd)
  puts "\nDone!"
end
