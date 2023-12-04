import pandas as pd
import os

# 输入和输出文件夹路径
input_folder = 'datatoprocess'
output_folder = 'dataprocessed'

# 如果输出文件夹不存在，创建它
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# 遍历文件夹中的所有csv文件
for file in os.listdir(input_folder):
    if file.endswith('.csv'):
        # 读取csv文件
        df = pd.read_csv(os.path.join(input_folder, file))

        # 更改列名
        df = df.rename(columns={'Country or Area': 'CountryorArea', 'Value Footnotes': 'ValueFootnotes'})

        # 删除特定行
        df = df[~df['CountryorArea'].isin([
            'World', 'Asia', 'Eastern Asia', 'Southern Asia', 'South-eastern Asia', 'Western Asia', 'Central Asia', 
            'Europe', 'European Union (27)', 'Eastern Europe', 'Southern Europe', 'Western Europe', 'Northern Europe', 
            'Americas', 'Northern America', 'South America', 'Central America', 
            'Africa', 'Eastern Africa', 'Southern Africa', 'Western Africa', 'Northern Africa', 'Middle Africa', 
            'Low Income Food Deficit Countries', 
            'Land Locked Developing Countries', 
            'Net Food Importing Developing Countries', 
            'China, mainland', 'Oceania', 
            'Least Developed Countries', 
            'Small Island Developing States', 'Caribbean', 
            ])]

        # 选择特定行
        df_Processing = df[df['Element'] == 'Processing']
        df_Food = df[df['Element'] == 'Food']
        df_Domsly = df[df['Element'] == 'Domestic supply quantity']
        df_Production = df[df['Element'] == 'Production']
        df_Foodcapita = df[df['Element'] == 'Food supply quantity (kg/capita/yr)']

        df_Processing = df_Processing.sort_values(by=['Year', 'Value'], ascending=[False, False])
        df_Food = df_Food.sort_values(by=['Year', 'Value'], ascending=[False, False])
        df_Domsly = df_Domsly.sort_values(by=['Year', 'Value'], ascending=[False, False])
        df_Production = df_Production.sort_values(by=['Year', 'Value'], ascending=[False, False])
        df_Foodcapita = df_Foodcapita.sort_values(by=['Year', 'Value'], ascending=[False, False])

        # 将更改后的数据帧写回新的csv文件
        df_Processing.to_csv(os.path.join(output_folder, file[:-4] + 'Processing.csv'), index=False)
        df_Food.to_csv(os.path.join(output_folder, file[:-4] + 'Food.csv'), index=False)
        df_Domsly.to_csv(os.path.join(output_folder, file[:-4] + 'Domsly.csv'), index=False)
        df_Production.to_csv(os.path.join(output_folder, file[:-4] + 'Production.csv'), index=False)
        df_Foodcapita.to_csv(os.path.join(output_folder, file[:-4] + 'Foodcapita.csv'), index=False)

