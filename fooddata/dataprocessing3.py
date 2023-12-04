import pandas as pd
import os

# 输入和输出文件夹路径
input_folder = 'datatoprocess'
output_folder = 'dataprocessed3'
file_names = []

# 如果输出文件夹不存在，创建它
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# 遍历文件夹中的所有csv文件
for file in os.listdir(input_folder):
    if file.endswith('.csv'):
        # 获取文件夹中的文件名
        file_names.append(file[:-4])

        # 读取csv文件
        df = pd.read_csv(os.path.join(input_folder, file),encoding='utf-8')

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
        
        # 删除最后9行
        df = df.iloc[:-9]

        # 使用pivot函数创建新的数据框
        df_pivot = df.pivot(index=['CountryorArea', 'Year'], columns='Element', values='Value')
        
        # 排序
        df_sorted = df_pivot.reset_index().sort_values(by=['Year', 'Production'], ascending=[False, False])
        if 'Processing' not in df_sorted.columns:
            df_sorted['Processing'] = 0
        df_sorted.to_csv(os.path.join(output_folder, file[:-4]+'.csv'), encoding='utf-8', index=False)
        
        
        # # 对于“Element”列值为指定值的行，对“Year”列的值进行从大到小排序，之后对“Value”列的值进行从大到小排序
        # elements = ['Production', 'Processing', 'Food', 'Domestic supply quantity', 'Food supply quantity (kg/capita/yr)']
        # df_sorted = []
        # for element in elements:
        #     df_element = df[df['Element'] == element].sort_values(by=['Year', 'Value'], ascending=[False, False])
        #     df_sorted.append(df_element)
        # df_concat = pd.concat(df_sorted)
        # df_concat.to_csv(os.path.join(output_folder, file[:-4] + '.csv'), index=False)
        
        # df_pivot.to_csv(os.path.join(output_folder, file[:-4]+'_pivot.csv'), index=True)


        
        
df_file_names = pd.DataFrame(file_names, columns=['foodNames'])
df_file_names.to_csv(os.path.join(output_folder, '0foodNames_list.csv'), index=False)

